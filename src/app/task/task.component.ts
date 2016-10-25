import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ChannelService, ChannelEvent } from "../service/channel.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() eventName: string;
  @Input() apiUrl: string;

  messages = "";

  private channel = "tasks";

  constructor(
    private http: Http,
    private channelService: ChannelService,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    // Get an observable for events emitted on this channel
    //
    this.channelService.sub(this.channel).subscribe(
      (x: ChannelEvent) => {
        switch (x.Name) {
          case this.eventName: {
            this.zone.run(() => this.appendStatusUpdate(x));
          }
        }
      },
      (error: any) => {
        console.warn("Attempt to join channel failed!", error);
      }
    )
  }


  private appendStatusUpdate(ev: ChannelEvent): void {
    // Just prepend this to the messages string shown in the textarea
    //
    let date = new Date();
    switch (ev.Data.State) {
      case "starting": {
        this.messages = `${date.toLocaleTimeString()} : starting\n` + this.messages;
        break;
      }

      case "complete": {
        this.messages = `${date.toLocaleTimeString()} : complete\n` + this.messages;
        break;
      }

      default: {
        this.messages = `${date.toLocaleTimeString()} : ${ev.Data.State} : ${ev.Data.PercentComplete} % complete\n` + this.messages;
      }
    }
  }

  callApi() {
    console.log(`calling ${this.apiUrl}`);

    this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
      .subscribe((message: string) => { console.log(message); });
  }
}
