import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Job } from './job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  inputs: ['job'],
})
export class JobComponent implements OnInit {
  job:Job;
  constructor() {
    
   }

  ngOnInit() {
  }

}
