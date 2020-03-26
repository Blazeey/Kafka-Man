import { Component, OnInit, ɵɵstylePropInterpolate1, ViewEncapsulation } from '@angular/core';
import { TopicService } from './Topic.service';
import { switchMap, catchError } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { of, throwError } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';
import * as _ from 'lodash';
import { KafkaClusterService } from '../kafka-cluster/kafka-cluster.service';
import { SpeedDialFabAnimations } from '../speed-dail-fab.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    SpeedDialFabAnimations
  ],
})
export class TopicComponent implements OnInit {

  clusterName: string;
  topicsList = [];
  displayedColumns: string[] = ['name', 'partitions', 'offsets', 'delete'];
  topicConfigs: any[];
  topicsProgressBar: boolean[] = [];
  clusters: any[];
  fabTogglerState = 'inactive';
  fabButtons = [];
  isTopicsLoading: boolean = true;
  topicForm: FormGroup;
  pageNumber: number = 1;
  nextPage: boolean = false;

  constructor(private topicService: TopicService,
    private formBuilder: FormBuilder,
    private clusterService: KafkaClusterService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.topicForm = this.formBuilder.group({
      searchTopic: ['']
    })

    this.clusterService.getClusters()
      .pipe(catchError(error => of('ERROR', error)))
      .subscribe(response => {
        this.clusters = response['message'];
        if(this.clusters.length > 0) {
          this.clusterName = this.clusters[0];
          this.fetchClusterTopics('', 1);
        }
      })
    this.topicService.listTopicConfigs()
    .pipe(catchError(error => of('ERROR', error)))
    .subscribe(configs => {
      this.topicConfigs = _.map(configs['message'], (key, value) => ({key, value}))
    })
  }

  fetchClusterTopics(search: string, page: number) {
    this.isTopicsLoading = true;
    this.topicsList = [];
    this.topicService.searchTopics(this.clusterName, search, page)
    .subscribe(response => {
      this.topicsList = response['message']['topics'];
      this.nextPage = response['message']['next'];
      this.topicsProgressBar = _.times(this.topicsList.length, _.constant(false));
      this.isTopicsLoading = false;
    })
  }

  topicDetails(part: number) {
    let size = this.topicConfigs.length/2;
    let part0 = this.topicConfigs.slice(0, size);
    let part1 = this.topicConfigs.slice(size+1, size*2);
    return part == 0? part0: part1;
  }

  addTopic() {
    const dialogRef = this.dialog.open(NewTopicDialogComponent, {
      width: '1000px',
      height: '1000px',
      hasBackdrop: true,
      data: this.topicConfigs
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response === null || response === undefined) return;
      this.topicService.createTopic(this.clusterName, response['topicName'], response['partitions'], response['replication'], response['configs'])
      .pipe(catchError((error) => {
        this.displaySnackBar(error.error.error, ':(');
        return throwError(error);
      }))  
      .subscribe(response => {
        this.topicsList.push(response.message)
        this.displaySnackBar('Topic created', '');
      })
    });
  }

  getTopicConfig(topicName: string, index: number) {
    if('config' in this.topicsList[index]) return;
    this.topicsProgressBar[index] = true;
    this.topicService.getTopicConfigs(this.clusterName, topicName)
      .subscribe(response => {
        this.topicsList.filter(topic => topic['name'] == topicName)[0]['config'] = response['message'];
        this.topicsProgressBar[index] = false;
      })
  }

  deleteTopic(topicName: string) {
    this.topicService.deleteTopic(this.clusterName, topicName)
      .subscribe(response => {
        this.topicsList = this.topicsList.filter(topic => topic.name != topicName);
        this.displaySnackBar('Deleted topic', ':)');
      })
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.fabButtons = this.clusters;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.fabButtons = [];
  }

  toggleFab() {
    this.fabTogglerState === 'active'? this.hideItems(): this.showItems();
  }

  changeCluster(clusterName: string) {
    this.clusterName = clusterName;
    this.isTopicsLoading = true;
    this.fetchClusterTopics('', 1);
    this.hideItems();
  }

  displaySnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'snackbar-center'
    })
  }

  search(pageChange: number) {
    if(pageChange == 0) this.pageNumber = 1;
    else this.pageNumber = this.pageNumber + pageChange;
    this.fetchClusterTopics(this.topicForm.controls.searchTopic.value, this.pageNumber);
  }
}
