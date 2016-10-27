import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Job, JobStatus } from './job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  inputs: ['job'],
})
export class JobComponent implements OnInit {
  job: Job;
  constructor() {

  }

  ngOnInit() {
  }

  isStatusNotRun(): boolean {
    return this.job.status === JobStatus.NotRun;
  }

  isStatusRunning(): boolean {
    return this.job.status === JobStatus.Running;
  }

  isStatusError(): boolean {
    return this.job.status === JobStatus.Failed;
  }

  isStatusSuccess(): boolean {
    return this.job.status === JobStatus.Success;
  }

  isStatusStopped():boolean{
    return this.job.status === JobStatus.Stopped;
  }

}
