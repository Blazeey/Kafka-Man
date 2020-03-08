import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-consumer-messages-list',
  templateUrl: './consumer-messages-list.component.html',
  styleUrls: ['./consumer-messages-list.component.scss']
})
export class ConsumerMessagesListComponent implements OnInit {
  @Input('messages') messages: [];
  @Output() notifyCurrentMessage: EventEmitter<any> = new EventEmitter();
  currentMessage: number = 0;

  constructor() { }

  ngOnInit() {
  }

  changeCurrentElement(message: any) {
    this.currentMessage = message['count'];
    this.notifyCurrentMessage.emit(message);
  }
}
