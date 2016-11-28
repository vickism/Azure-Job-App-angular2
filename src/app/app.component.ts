import { Component, NgZone, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Job } from './job/job.model';
import { JobStatus } from './job/job.model';
import { JobService } from './service/jobService';
import { ChannelService, ConnectionState, ChannelEvent } from "./service/channel.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  public jobs: Job[];
  title = 'app works!';
  errormessage: string;
  connectionState$: Observable<string>;
  private channel = "jobs";
  private eventName = "job";
  displayJobOutput = false;
  displayJobOutputId = "";
  jobOutput = "";

  constructor(
    private _jobService: JobService,
    private channelService: ChannelService,
    private zone: NgZone) {
    //this.initSignalR();
    //this.jobs = [];
  };
  
  private convertToJobs(jobsJson: any): Job[] {
    return jobsJson.map(item => {
      return this.convertToJob(item);
    });
  }

  private convertToJob(item: any): Job {
    return new Job(item.title, JobStatus[String(item.status)], item.count, item.lastRuntime, item.duration, item.output);
  }

  private updateJobsInASmartWay(jobs: Job[]): void {

    jobs.forEach(element => {
      var foundElement = this.jobs.find((value: Job) => {
        return value.title === element.title;
      });
      if (!foundElement) {
        this.jobs.push(element);
      }
      if (foundElement) {
        foundElement.copy(element);
      }
    });

    let indexValuesToRemove = [];
    //remove extras
    this.jobs.forEach(element => {
      let index = jobs.findIndex(value => value.title === element.title);
      if (index < 0) {
        indexValuesToRemove.push(index);
      }
    });

    indexValuesToRemove.forEach(element => {
      this.jobs.splice(element, 1);
    });
  }

  private initSignalR(): void {
    this.connectionState$ = this.channelService.connectionState$
      .map((state: ConnectionState) => { return ConnectionState[state]; });

    this.channelService.error$.subscribe(
      (error: any) => { console.warn(error); },
      (error: any) => { console.error("errors$ error", error); }
    );

    // Wire up a handler for the starting$ observable to log the
    //  success/fail result
    //
    this.channelService.starting$.subscribe(
      () => { console.log("signalr service has been started"); },
      () => { console.warn("signalr service failed to start!"); }
    );
  }


  jobSelected(jobId: string): void {
    console.log(`Job ${jobId} selected.`);
    if (this.displayJobOutputId === jobId) {
      this.displayJobOutput = false;
      this.jobOutput = "";
      this.displayJobOutputId = "";
    } else {
      this.displayJobOutputId = jobId;
      this.displayJobOutput = true;
      let job = this.jobs.find(element => element.title === jobId);
      if (job) {
        this.jobOutput = job.output;
        console.log(this.jobOutput);
      }
    }
  }



  ngOnInit() {
    console.log("Starting the channel service");
    this.channelService.start();
    this.channelSubscribe();
this._jobService.getJobs().subscribe((jobs: any) =>this.jobs= this.convertToJobs(jobs), error => this.errormessage = error);
  console.log(this.jobs);
  }

  private channelSubscribe(): void {
    this.channelService.sub(this.channel).subscribe(
      (x: ChannelEvent) => {
        switch (x.Name) {
          case this.eventName: {
            console.log(x.Data);
            this.zone.run(() => {
              var jobs = this.convertToJobs(x.Data);
              this.updateJobsInASmartWay(jobs);
            });
          }
        }
      },
      (error: any) => {
        console.warn("Attempt to join channel failed!", error);
      }
    )
  }



}
