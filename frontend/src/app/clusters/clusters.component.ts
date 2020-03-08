import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClusterService } from './clusters.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NewClusterDialogComponent } from '../new-cluster-dialog/new-cluster-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClustersComponent implements OnInit {

  clusterList: any[];
  displayedColumns: string[] = ['name', 'brokers', 'controlerBroker', 'produce', 'consume', 'topic', 'group', 'delete'];
  clustersProgressBar: any[];

  constructor(private clusterService: ClusterService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { 
  }

  getClusters() {
    this.clusterService.getClusterList()
      .pipe(catchError(error => of('ERROR', error)))
      .subscribe(response => {
        this.clusterList = response['message'];
        this.clustersProgressBar = _.times(this.clusterList.length, _.constant(false));
      })
  }

  ngOnInit() {
    this.getClusters();
  }

  addCluster() {
    const dialogRef = this.dialog.open(NewClusterDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response === null || response === undefined) return;
      this.clusterService.addCluster(response['name'], response['brokers'])
        .pipe(catchError((error) => {
          console.log(error)
          this.snackBar.open(error.error.error, ':(', {
            duration: 3000,
            panelClass: 'snackbar-center'
          });
          return throwError(error);
        }))  
        .subscribe(response => {
          this.snackBar.open('Cluster added', 'Ezzy Pzzy', {
            duration: 3000,
            panelClass: 'snackbar-center'
          });
        })
    });
  }

  deleteCluster(clusterName: string) {
    this.clusterService.deleteCluster(clusterName)
      .subscribe(response => {
        this.clusterList = this.clusterList.filter(cluster => cluster['name'] != clusterName);
      })
  }
}
