import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../group/group.service';
import * as CanvasJS from './../canvasjs.min.js';

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
  chart: CanvasJS.Chart;
  maxDataPoints: number = 100;
  enableChart: boolean = false;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    console.log(this.group)
    console.log(this.groupName)
    console.log(this.clusterName)
  }

  initializeChartData() {

    let dataPoints = [];
    for(const [topic, partitions] of Object.entries(this.group)) {
      for(const [partition, offsets] of Object.entries(partitions)) {
        this.chartData[topic + '#' + partition] = [];
        let data = {
          type: 'spline',
          name: `${topic}#${partition}`,
          showInLegend: true,
          dataPoints: this.chartData[topic + '#' + partition]
        }
        dataPoints.push(data);
      }
    }
    return dataPoints;
  }

  fetchConsumerLag() {

    this.enableChart = true;
    this.chart = new CanvasJS.Chart(this.key, {
      exportEnabled: true,
      animationEnabled: true,
      axisY:{
        title: "Consumer Lag"
      },
      legend:{
        cursor:"pointer",
        itemclick: this.toggleDataSeries
      },
      toolTip: {
        shared: true
      },
      title: {
        text: `Consumer Lag - Group : ${this.groupName}`
      },
      data: this.initializeChartData()
    })
    
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
        console.log(offsets);
        let key = this.topicPartitionKey(topic, partition);

        this.chartData[key].push({
          label: (new Date()).toLocaleTimeString(),
          y: offsets['consumer_lag']
        })

        if (this.chartData[key].length > this.maxDataPoints)
          this.chartData[key].shift();
      }
    }
    this.chart.render();
  }

  stopConsuming() {
    this.groupService.stopConsuming();
  }

  get key() {
    return this.groupName + '#chart';
  }

  topicPartitionKey(topic: string, partition: string) {
    return topic + '#' + partition;
  }
}
