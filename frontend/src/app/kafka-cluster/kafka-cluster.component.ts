import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KafkaClusterService } from './kafka-cluster.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-kafka-cluster',
  templateUrl: './kafka-cluster.component.html',
  styleUrls: ['./kafka-cluster.component.scss']
})
export class KafkaClusterComponent implements OnInit {

  clusterName: string;
  clusterDetails: {[key: string]: any};

  constructor(private route: ActivatedRoute, private clusterService: KafkaClusterService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.clusterName = params.get('name');
        return this.clusterService.describeCluster(this.clusterName)
      }))
      .pipe(catchError(error => of('ERROR', error)))
      .subscribe(response => {
        console.log(response)
        this.clusterDetails = response['message'];
      });
  }

}
