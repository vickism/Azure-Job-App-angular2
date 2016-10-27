import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { JobService } from './service/jobService';
import { ChannelService, ChannelConfig, SignalrWindow } from "./service/channel.service";

import { AppComponent } from './app.component';
import { JobComponent } from './job/job.component';
import { JobListComponent } from './job-list/job-list.component';
import { TaskComponent } from './task/task.component';
import { JobSummaryComponent } from './job-summary/job-summary.component';

let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:50601/signalr";
channelConfig.hubName = "EventHub";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    JobComponent,
    JobListComponent,
    TaskComponent,
    JobSummaryComponent
  ],
  providers: [JobService, ChannelService, { "provide": SignalrWindow, "useValue": window },{ "provide": "channel.config", "useValue": channelConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
