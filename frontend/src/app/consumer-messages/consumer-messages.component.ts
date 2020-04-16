import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef, OnChanges, SimpleChanges, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';

@Component({
  selector: 'app-consumer-messages',
  templateUrl: './consumer-messages.component.html',
  styleUrls: ['./consumer-messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsumerMessagesComponent implements OnInit, DoCheck {
  @Input('messages') messageList: any[];
  @Input('searchQuery') search: string;
  currentMessage: {};
  differ: any;

  constructor(private cdRef: ChangeDetectorRef,
    differs: IterableDiffers) { 
      this.differ = differs.find([]).create(null);
    }

  ngOnInit() {
  }

  ngDoCheck() {
    // const change = this.differ.diff(this.messageList);
    // console.log(change);
    if((this.currentMessage === null || this.currentMessage === undefined) && this.messageList.length > 0) {
      this.currentMessage = this.messageList[0];
    }

  }

  setChangedMessage(event) {
    this.currentMessage = event;
    this.cdRef.detectChanges();
  }
}
