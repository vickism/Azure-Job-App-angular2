import { Component, NgZone } from '@angular/core';
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
export class AppComponent {
  jobs: Job[];
  title = 'app works!';
  errormessage: string;
  connectionState$: Observable<string>;
  private channel = "jobs";
  private eventName = "job";

  constructor(
    private _jobService: JobService,
    private channelService: ChannelService,
    private zone: NgZone) {
    //this._jobService.getJobs().subscribe((jobs: any) => this.convertToJobs(jobs), error => this.errormessage = error);
    this.initSignalR();
    this.jobs = [];
  };

  private convertToJobs(jobsJson: any): void {
    this.jobs = jobsJson.map(item => {
      return this.convertToJob(item);
    });
  }

  private convertToJob(item: any): Job {
    return new Job(item.title, JobStatus[String(item.status)], item.count);
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
  }

  ngOnInit() {
    console.log("Starting the channel service");
    this.channelService.start();
    this.channelSubscribe();

  }

  private channelSubscribe(): void {
    this.channelService.sub(this.channel).subscribe(
      (x: ChannelEvent) => {
        switch (x.Name) {
          case this.eventName: {
            console.log(x.Data);
            this.zone.run(() => {
              this.convertToJobs(x.Data);
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
