import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../group/group.service';
import { IChartistLineChart, IChartistData, ILineChartOptions } from 'chartist';
import * as Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import 'chartist-plugin-axistitle';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input('cluster') clusterName: string;
  @Input('group') group: any;
  @Input('groupName') groupName: any;

  chartData: {} = {};
  maxDataPoints: number = 100;
  enableChart: boolean = false;
  chart: IChartistLineChart;
  data: IChartistData;
  dataPoints: {[key: string]: number[]} = {};
  labels: string[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  getChartData() {

    var data = {
      labels: this.labels,
      series: Object.values(this.dataPoints)
    };

    return data;
  }

  fetchConsumerLag() {

    this.enableChart = true;

    let options: ILineChartOptions = {
      axisX: {
        showGrid: false
      },
      axisY: {
        onlyInteger: true,
        offset: 20
      },
      height: 300,
      plugins: [
        Chartist.plugins.tooltip(),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "Consumer Lag",
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: "middle"
          },
          axisY: {
            axisTitle: `Consumer Lag - Group : ${this.groupName}`,
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: 0
            },
            flipTitle: false
          }
        })
      ]
    }

    this.chart = new Chartist.Line('#'+this.key, this.getChartData(), options);
    
    this.groupService.consume(this.clusterName, this.groupName, this.processMessage.bind(this));
  }

  toggleDataSeries(e) {
    if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;            
    }
    e.chart.render();
  }

  processMessage(message: {}) {
    for(const [topic, partitions] of Object.entries(message)) {
      for(const [partition, offsets] of Object.entries(partitions)) {
        let key = this.topicPartitionKey(topic, partition);

        this.dataPoints[key] = this.dataPoints[key] || [];
        this.dataPoints[key].push(offsets['consumer_lag'])

        if (this.dataPoints[key].length > this.maxDataPoints) {
          this.dataPoints[key].shift();
        }
      }
    }
    this.labels.push((new Date()).toLocaleTimeString());
    if(this.labels.length > this.maxDataPoints) this.labels.shift();
    this.chart.update(this.getChartData());
  }

  stopConsuming() {
    this.groupService.stopConsuming();
  }

  get key() {
    return this.groupName + '-chart';
  }

  topicPartitionKey(topic: string, partition: string) {
    return topic + '#' + partition;
  }
}
