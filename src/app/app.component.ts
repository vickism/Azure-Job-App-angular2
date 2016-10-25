import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Job } from './job/job.model';
import { JobStatus } from './job/job.model';
import { JobService } from './service/jobService';
import { ChannelService, ConnectionState } from "./service/channel.service";

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

  constructor(private _jobService: JobService, private channelService: ChannelService) {
    this._jobService.getJobs().subscribe((jobs: any) => this.convertToJobs(jobs), error => this.errormessage = error);
    this.initSignalR();
  };

  private convertToJobs(jobsJson: any): void {
    this.jobs = jobsJson.map(item => {
      return new Job(item.title, JobStatus[String(item.status)], item.count);
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
  }

  ngOnInit() {
    console.log("Starting the channel service");
    this.channelService.start();
  }



}
