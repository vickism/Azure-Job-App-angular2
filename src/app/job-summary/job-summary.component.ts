import { Component, OnInit, Input } from '@angular/core';
import { Job, JobStatus } from '../job/job.model';



@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.css'],
  inputs: ['jobs'],
})
@Input()

export class JobSummaryComponent implements OnInit {
 public jobs: Job[] ;
  
  
  constructor() {

  }

  ngOnInit() {
    
  }

  TotalJobs(): number {
    if(!this.jobs)
      return 0;
    return this.jobs.length;
  }

  TotalRuns(): number {
    if(!this.jobs)
      return 0;
    let count = 0;
    this.jobs.forEach((value: Job) => {
      count += value.count;
    });
    return count;
  }

  TotalSuccessfulJobs(): number {
    if (!this.jobs || this.jobs.length==0){
      return 0;
    }
    var success =  this.jobs.filter((value: Job, index: number, jobs: Job[]) => {
      return value.status === JobStatus.Success;
    }).length;

    var total = this.TotalJobs();

    return Math.round((success / total) * 100);
  }

  TotalFailedJobs(): number {
    if (!this.jobs || this.jobs.length==0){
      return 0;
    }
    var failure =  this.jobs.filter((value: Job, index: number, jobs: Job[]) => {
      return value.status === JobStatus.Failed;
    }).length;

    var total = this.TotalJobs();

     return Math.round((failure / total) * 100);
  }

  TotalStoppedJobs(): number {
    if (!this.jobs || this.jobs.length==0){
      return 0;
    }
    var failure =  this.jobs.filter((value: Job, index: number, jobs: Job[]) => {
      return value.status === JobStatus.Stopped;
    }).length;

    var total = this.TotalJobs();

     return Math.round((failure / total) * 100);
  }

  TotalRunningJobs(): number {
    if (!this.jobs || this.jobs.length==0){
      return 0;
    }
    var failure =  this.jobs.filter((value: Job, index: number, jobs: Job[]) => {
      return value.status === JobStatus.Running;
    }).length;

    var total = this.TotalJobs();

     return Math.round((failure / total) * 100);
  }
}