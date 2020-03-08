import { Component, OnInit, ɵɵstylePropInterpolate1, ViewEncapsulation } from '@angular/core';
import { TopicService } from './Topic.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { of, throwError } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';
import { Constants } from '../app.constant';
import * as _ from 'lodash';
import { KafkaClusterService } from '../kafka-cluster/kafka-cluster.service';
import { SpeedDialFabAnimations } from '../speed-dail-fab.animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  topicsProgressBar: boolean[];
  clusters: any[];
  fabTogglerState = 'inactive';
  fabButtons = [];
  isTopicsLoading: boolean = true;

  constructor(private topicService: TopicService,
    private clusterService: KafkaClusterService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clusterService.getClusters()
      .pipe(catchError(error => of('ERROR', error)))
      .subscribe(response => {
        console.log(response)
        this.clusters = response['message'];
        if(this.clusters.length > 0) {
          this.clusterName = this.clusters[0];
          this.fetchClusterTopics();
        }
      })
    this.topicService.listTopicConfigs()
    .pipe(catchError(error => of('ERROR', error)))
    .subscribe(configs => {
      this.topicConfigs = _.map(configs['message'], (key, value) => ({key, value}))
    })
  }

  fetchClusterTopics() {
    this.topicsList = [];
    this.topicService.listTopics(this.clusterName)
    .subscribe(response => {
      this.topicsList = response['message'];
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
        console.log(error)
        this.snackBar.open(error.error.error, ':(', {
          duration: 3000,
          panelClass: 'snackbar-center'
        });
        return throwError(error);
      }))  
      .subscribe(response => {
        this.snackBar.open('Topic created', 'Ezzy Pzzy', {
          duration: 3000,
          panelClass: 'snackbar-center'
        });
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

  deleteTopic(topic: string) {
    this.topicService.deleteTopic(this.clusterName, topic)
      .subscribe(response => {
        console.log(response);
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
    this.fetchClusterTopics();
    this.hideItems();
  }
}
