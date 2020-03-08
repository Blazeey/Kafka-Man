import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Constants } from '../app.constant';

@Component({
  selector: 'app-new-topic-dialog',
  templateUrl: './new-topic-dialog.component.html',
  styleUrls: ['./new-topic-dialog.component.scss']
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class NewTopicDialogComponent implements OnInit {

  createTopicForm: FormGroup;
  tooltipPosition: TooltipPosition = "above";

  constructor(public dialogRef: MatDialogRef<NewTopicDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public topicConfigList: {}
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    let controls = {}
    Constants.TOPIC_CONFIGS.forEach(config => {
      controls[config.name] = [config.default];
    })
    let group = {
      topicName: ['', Validators.required],
      partitions: [1, Validators.required],
      replication: [1, Validators.required]
    };
    group = Object.assign({}, controls, group);
    this.createTopicForm = this.formBuilder.group(group)
  }

  createTopic() {
    let configs = {}
    Constants.TOPIC_CONFIGS.forEach(config => {
      if(config.default !== this.form[config['name']].value)
        configs[config['config']] = this.form[config['name']].value;
    })

    let topic = {
      topicName: this.form.topicName.value,
      partitions: this.form.partitions.value,
      replication: this.form.replication.value,
      configs: configs
    }
    console.log(topic)
    this.dialogRef.close(topic);
  }

  get form() {
    return this.createTopicForm.controls;
  }

  get topicConfigs() {
    return Constants.TOPIC_CONFIGS;
  }

  getToolTip(config: {}) {
    return `Config : ${config['config']}\nValid : ${config['valid']}\nServer default : ${config['serverDefault']}`;
  }
}
