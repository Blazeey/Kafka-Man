import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrokerService } from './broker.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.scss']
})
export class BrokersComponent implements OnInit {

  clusterName: string;
  brokers: any;

  constructor(private route: ActivatedRoute, private brokerService: BrokerService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.clusterName = params.get('name');
        return this.brokerService.getBrokerDetails(this.clusterName);
      })
    ).subscribe(response => {
      this.brokers = response['message'];
    })
  }

}
