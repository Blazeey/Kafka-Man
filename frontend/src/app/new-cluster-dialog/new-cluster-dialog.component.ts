import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-cluster-dialog',
  templateUrl: './new-cluster-dialog.component.html',
  styleUrls: ['./new-cluster-dialog.component.scss']
})
export class NewClusterDialogComponent implements OnInit{

  addClusterForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewClusterDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.addClusterForm = this.formBuilder.group({
      clusterName: ['', Validators.required],
      brokerList: ['', Validators.required]
    })
  }

  addCluster() {
    let cluster = {
      name: this.form.clusterName.value,
      brokers: this.form.brokerList.value
    }
    this.dialogRef.close(cluster);
  }

  get form() {
    return this.addClusterForm.controls;
  }

}

export interface ClusterData {
  name: string;
  brokers: string
}