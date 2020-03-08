import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GroupService } from './group.service';
import { switchMap } from 'rxjs/operators';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  clusterName: string;
  groups: {};
  charts = {};
  chartsData = {};
  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.clusterName = params.get('name');
        return this.groupService.listGroups(this.clusterName);
      })
    ).subscribe(response => {
      this.groups = response['message'];
    })
  }
}
