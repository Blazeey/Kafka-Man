import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ProducerService } from './producer.service';
import { catchError, switchMap, startWith, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Constants } from '../app.constant';
import { ClusterService } from '../clusters/clusters.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';
import { SyntaxHighlightService } from '../syntax-highlight.service';
import { MatTabGroup, MatSnackBar } from '@angular/material';


export interface Parameter {
  key: string;
  value: string;
}

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProducerComponent implements OnInit, AfterViewChecked {
  @ViewChild('tabGroup', {static: false}) tabGroup: MatTabGroup;

  producerForm: FormGroup;
  clusters: string[] = [];
  topicsMap: {} = {};
  filteredTopics: Observable<string[]>;
  headerObeserver: Observable<string[]>;
  headerParams: Parameter[] = [{
    key: '',
    value: '',
  }];
  selection = new SelectionModel<Parameter>(true, []);
  displayedColumns = ['select', 'key', 'value', 'delete'];
  isClustersLoading = true;
  

  constructor(private producerService: ProducerService, 
    private formBuilder: FormBuilder, 
    private clusterService: ClusterService,
    private syntaxHighlightService: SyntaxHighlightService,
    private cdRef : ChangeDetectorRef,
    private snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.clusterService.getTopicsList()
    .pipe(catchError(error => of('ERROR', error)))
    .subscribe(response => {
      this.topicsMap = response['message'];
      this.isClustersLoading = false;
      this.clusters = Object.keys(response['message']);
    })

    this.producerForm = this.formBuilder.group({
      clusterName: ['', Validators.required],
      topic: ['', [Validators.required, this.validateTopic.bind(this)]],
      type: ['text', Validators.required],
      partitioning: [''],
      partitioningValue: [''],
      loopValue: [1],
      message: ['', [Validators.required, this.validMessage.bind(this)]],
      key: [''],
      keyType: ['text'],
      compression: ['nil']
    });

    this.filteredTopics = this.producerForm.controls.topic.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  get form() { return this.producerForm.controls; }

  get messageTypes() {
    return Constants.MESSAGE_TYPES;
  }

  get partitionTypes() {
    return Constants.PARTITIONING;
  }

  get compressionCodecs() {
    return Constants.COMPRESSION_CODEC;
  }

  produce() {
    if(this.producerForm.invalid) {
      return;
    }
    let form = this.form;
    let clusterName = form.clusterName.value;
    let headers = this.selection.selected;
    let message = this.rawMessage('message', false);
    let type = this.form.type.value;
    let key = this.rawMessage('key', false);
    let topic = form.topic.value;
    let partitioning = form.partitioning.value;
    let partitioningValue = form.partitioningValue.value;
    let compression = form.compression.value;
    let count = form.loopValue.value;

    let headersMap = headers.reduce((map, header) => {
      map[header.key] = header.value;
      return map;
    }, {})
    this.producerService.pushMessage(clusterName, 
      topic, 
      message,
      type,
      headersMap,
      key,
      partitioning,
      partitioningValue,
      compression,
      count)
      .pipe(catchError((error) => {
        this.snackBar.open('Oops something went wrong!', ':(', {
          duration: 2000,
          panelClass: 'snackbar-center'
        });
        return throwError(error)
      }))
      .subscribe(response => {
        this.snackBar.open('Message Produced', '', {
          duration: 2000,
          panelClass: 'snackbar-center'
        });
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(!(this.form.clusterName.value in this.topicsMap)) return [];
    return this.topicsMap[this.form.clusterName.value].filter(option => option.toLowerCase().includes(filterValue));
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.headerParams.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        (this.selection.clear()):
        (this.headerParams.forEach(row => this.selection.select(row)));
  }

  headerChange(row: number) {
    if(row + 1 == this.headerParams.length)
    this.headerParams = this.headerParams.concat([{
        key: '',
        value: ''
      }]);
  }

  deleteHeader(row: any) {
    if(this.headerParams.length == 1) return;
    this.headerParams = this.headerParams.filter(r => r !== row);
  }

  prettyPrint(type: string) {
    let value = (type === 'message')? this.form.message: this.form.key;
    type = (type === 'message')? this.form.type.value: this.form.keyType.value;
    switch(type) {
      case 'json':
        value.setValue(this.syntaxHighlightService.jsonSyntaxHighlight(value.value));
        break;
      case 'xml':
        value.setValue(this.syntaxHighlightService.xmlSyntaxHighlight(value.value));
        break;
      default:
        break;
    }
  }

  rawMessage(type: string, setValue: boolean) {
    let value = (type === 'message')? this.form.message: this.form.key;
    type = (type === 'message')? this.form.type.value: this.form.keyType.value;
    let text: string;
    switch(type) {
      case 'json':
        text = this.syntaxHighlightService.rawJson(value.value)
        break;
      case 'xml':
        text = this.syntaxHighlightService.rawXml(value.value);
        break;
      default:
        text = value.value;
        break;
    }
    if(setValue)
      value.setValue(text);
    else {
      if(type === 'json') text = JSON.parse(text);
    }
    return text;
  }

  codeMirrorOptions(type: string) {

    let value = (type === 'message')? this.form.type.value: this.form.keyType.value;
    let mode = this.messageTypes.filter(type => type.name == value)[0];

    return {
      theme: 'solarized',
      mode: mode.value,
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      matchBrackets: true,
      matchTags: true,
      autoCloseTags: true,
      lint: true
    };
  }

  validateTopic(control: AbstractControl) {
    if(this.producerForm === undefined || this.producerForm === null)
      return { validTopic: true };
    else if(!(this.form.clusterName.value in this.topicsMap))
      return { validTopic: true };
    else if (!this.topicsMap[this.form.clusterName.value].includes(control.value))
      return { validTopic: true };
    return null;
  }

  validMessage(control: AbstractControl) {
    if(this.producerForm === undefined || this.producerForm === null || this.syntaxHighlightService === null || this.syntaxHighlightService ===undefined)
      return { validMessage: true };
    else if(!(this.syntaxHighlightService.validMessage(this.form.type.value, control.value)))
      return { validMessage: true };
    return null;
  }

  changeType(event) {
    this.form.message.updateValueAndValidity();
    this.form.key.updateValueAndValidity();
    this.cdRef.detectChanges();
  }
}
