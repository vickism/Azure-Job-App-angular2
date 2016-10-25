import { Component, OnInit, EventEmitter } from '@angular/core';
import { Job } from '../job/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  inputs: ['jobs'],
  outputs: ['onJobSelected']
})
export class JobListComponent implements OnInit {
  jobs: Array<Job>;
  selectedJob: Job;
  onJobSelected: EventEmitter<string>;

  constructor() {
    this.onJobSelected = new EventEmitter<string>();
  }

  clicked(job: Job): void {
    this.selectedJob = job;
    this.onJobSelected.emit(job.title);
  }

  isSelected(job:Job):boolean{
    if (!job || !this.selectedJob){
      return false;
    }

    return job.title === this.selectedJob.title;
  }

  ngOnInit() {
  }

}
