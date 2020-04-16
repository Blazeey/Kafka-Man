import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConsumerService } from './consumer.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { switchMap, catchError, startWith, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Constants } from '../app.constant';
import { ClusterService } from '../clusters/clusters.service';
import { GroupService } from '../group/group.service';
import * as moment from  'moment';
import { TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsumerComponent implements OnInit {

  messageList: any[] = [];
  topicsList: [];
  clusters: string[] = [];
  topicsMap: {} = {};
  consumerForm: FormGroup;
  isConsuming: boolean;
  filteredTopics: Observable<string[]>;
  consumerGroups: {} = {};
  filteredGroups: Observable<string[]>;
  currentMessageCount: number = 0;
  isClustersLoading = true;
  consumerId: string;

  constructor(private consumerService: ConsumerService,
    private formBuilder: FormBuilder,
    private clusterService: ClusterService,
    private cdRef : ChangeDetectorRef,
    private groupService: GroupService) { }

  ngOnInit() {

    this.clusterService.getTopicsList()
    .pipe(catchError(error => of('ERROR', error)))
    .subscribe(response => {
      this.topicsMap = response['message'];
      this.isClustersLoading = false;
      this.clusters = Object.keys(response['message']);
    })

    this.consumerForm = this.formBuilder.group({
      clusterName: ['', Validators.required],
      topic: ['', [Validators.required, this.validateTopic.bind(this)]],
      messageType: ['text', Validators.required],
      keyType: ['text', Validators.required],
      startFilter: ['none'],
      startFilterValue: ['', [this.validateStartFilterInput.bind(this)]],
      startFilterValueDate: ['', [this.validateDate.bind(this)]],
      search: ['']
    });

    this.filteredTopics = this.consumerForm.controls.topic.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredGroups = this.consumerForm.controls.startFilterValue.valueChanges
        .pipe(
          startWith(''),
          map(value => this.groupFilter(value))
        );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(!(this.form.clusterName.value in this.topicsMap)) return [];
    return this.topicsMap[this.form.clusterName.value].filter(option => option.toLowerCase().includes(filterValue));
  }

  private groupFilter(value: any): string[] {
    value += '';
    const filterValue = value.toLowerCase();
    if(this.form.startFilter.value !== 'consumer-group') return [];
    return Object.keys(this.consumerGroups).filter(option => option.toLowerCase().includes(filterValue));
  }

  get offsets() {
    return Constants.OFFSETS;
  }

  get messageDeserializationType() {
    return Constants.MESSAGE_DESERIALIZATION_TYPE;
  }

  get keyDeserializationType() {
    return Constants.KEY_DESERIALIZATION_TYPE;
  }

  get startFilter() {
    return Constants.START_FILTER;
  }

  get form() { return this.consumerForm.controls; }

  get startFilterLabel() {
    let startFilter = this.form.startFilter.value;
    switch(startFilter) {
      case 'consumer-group': return 'Group Name';
      case 'offset': return 'Offset';
      case 'previous-x': return 'X Offset';
      case 'specific-date': return 'Date (MM/DD/YYYY)';
      default: return '';
    }
  }

  get hideStartFilterValueInput() {
    let startFilter = this.form.startFilter.value;
    if(startFilter === 'none' || startFilter === 'beginning' || 
      startFilter === 'latest' || startFilter === 'today' || 
      startFilter === 'last-hour' || startFilter === 'specific-date')
      return false;
    return true;
  }

  get startFilterValueInputType() {
    let startFilter = this.form.startFilter.value;
    if(startFilter === 'none' || startFilter === 'beginning' || startFilter === 'latest' || 
      startFilter === 'today' || startFilter === 'last-hour' || startFilter === 'consumer-group')
      return 'text';
    else if(startFilter === 'specific-date')
      return 'date';
    return 'number';
  }

  consume() {
    if(this.consumerForm.invalid) {
      return;
    }
    let form = this.form;
    this.isConsuming = true;
    let clusterName = form.clusterName.value;
    let topic = form.topic.value;
    let messageType = form.messageType.value;
    let keyType = form.keyType.value;
    let startFilter = form.startFilter.value;
    let startFilterValue = form.startFilterValue.value;
    let startFilterValueDate = (form.startFilterValueDate.value as Date).toLocaleString();
    this.consumerId = Math.random().toString(36).substring(7);
    if(startFilter === 'specific-date')
      startFilterValue = startFilterValueDate;
    this.consumerService.consume(clusterName, topic, messageType, 
      keyType, startFilter, startFilterValue,
      this.consumerId, this.processMessage.bind(this));
  }

  processMessage(message: {}) {
    this.isConsuming = true;
    message['count'] = this.currentMessageCount++;
    this.messageList.unshift(message);
  }

  stopConsuming() {
    this.isConsuming = false;
    this.consumerService.stopConsuming(this.consumerId);
  }

  validateTopic(control: AbstractControl) {
    if(this.consumerForm === undefined || this.consumerForm === null)
      return { validTopic: true };
    else if(!(this.form.clusterName.value in this.topicsMap))
      return { validTopic: true };
    else if (!this.topicsMap[this.form.clusterName.value].includes(control.value))
      return { validTopic: true };
    return null;
  }

  validateDate(control: AbstractControl) {
    if(this.consumerForm === undefined || this.consumerForm === null)
      return null;
    else if(this.form.startFilter.value !== 'specific-date') {
      return null;
    }
    else if(!moment(control.value, 'MM/DD/YYYY', true).isValid())
      return { validDate: true };
    return null;
  }

  validateStartFilterInput(control: AbstractControl) {
    if(this.consumerForm === undefined || this.consumerForm === null)
      return null;
    else if(['consumer-group', 'offset', 'previous-x'].includes(this.form.startFilter.value)) {
      return (this.form.startFilterValue.value !== '')? null: { valid: true };
    }
    return null;
  }

  changeStartFilter(event) {
    let startFilter = this.form.startFilter.value;
    this.form.startFilterValueDate.updateValueAndValidity();
    this.form.startFilterValue.updateValueAndValidity();
    if(startFilter === 'consumer-group' && this.form.clusterName.value !== '') {
      this.groupService.listGroups(this.form.clusterName.value)
        .subscribe(response => {
          this.consumerGroups = response['message'];
        })
    }
  }

}
