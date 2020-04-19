import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GroupService } from './group.service';
import { group } from '@angular/animations';
import { switchMap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { KafkaClusterService } from '../kafka-cluster/kafka-cluster.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpeedDialFabAnimations } from '../speed-dail-fab.animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    SpeedDialFabAnimations
  ]
})
export class GroupComponent implements OnInit {

  clusterName: string;
  clusters: any[];
  groups: [];
  charts = {};
  chartsData = {};
  isGroupsLoading: boolean = true;
  groupForm: FormGroup;
  fabTogglerState = 'inactive';
  fabButtons = [];
  pageNumber: number = 1;
  nextPage: boolean = false;
  groupsProgressBar: boolean[] = [];

  constructor(private groupService: GroupService,
    private formBuilder: FormBuilder,
    private clusterService: KafkaClusterService) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      searchGroup: ['']
    })

    this.clusterService.getClusters()
      .pipe(catchError(error => of('ERROR', error)))
      .subscribe(response => {
        this.clusters = response['message'];
        if(this.clusters.length > 0) {
          this.clusterName = this.clusters[0];
          this.fetchClusterGroups('', 1);
        }
      })
  }

  fetchClusterGroups(search: string, pageNumber: number) {
    this.isGroupsLoading = true;
    this.groupService.listGroups(this.clusterName, search, pageNumber)
      .subscribe(response => {
        this.groups = response['message'];
        this.groupsProgressBar = _.times(this.groups.length, _.constant(false));
        this.isGroupsLoading = false;
      })
  }

  search(pageChange: number) {
    if(pageChange == 0) this.pageNumber = 1;
    else this.pageNumber = this.pageNumber + pageChange;
    this.fetchClusterGroups(this.groupForm.controls.searchGroup.value, this.pageNumber);
  }

  changeCluster(clusterName: string) {
    this.clusterName = clusterName;
    this.groups = [];
    this.isGroupsLoading = true;
    this.fetchClusterGroups('', 1);
    this.hideItems();
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
}
