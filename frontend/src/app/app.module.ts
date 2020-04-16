import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatListModule, MatTableModule, MatProgressSpinnerModule, MatSelectModule, 
  MatInputModule, MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule, 
  MatAutocompleteModule, MatTabsModule, MatCheckboxModule, MatButtonToggleModule, MatSnackBarModule, 
  MatDatepickerModule, MatNativeDateModule, MatIconModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import { ClustersComponent } from './clusters/clusters.component';
import { ProducerComponent } from './producer/producer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ClusterService } from './clusters/clusters.service';
import { KafkaClusterComponent } from './kafka-cluster/kafka-cluster.component';
import { KafkaClusterService } from './kafka-cluster/kafka-cluster.service';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { TopicComponent } from './topic/topic.component';
import { TopicService } from './topic/Topic.service';
import { BrokerDetailsPipe } from './broker-details.pipe';
import { NewClusterDialogComponent } from './new-cluster-dialog/new-cluster-dialog.component';
import { ConsumerMessageItemComponent } from './consumer-message-item/consumer-message-item.component';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';
import { GroupComponent } from './group/group.component';
import { GroupService } from './group/group.service';
import { ChartComponent } from './chart/chart.component';
import { BrokersComponent } from './brokers/brokers.component';
import { BrokerMetricsComponent } from './broker-metrics/broker-metrics.component';
import { BrokerService } from './brokers/broker.service';
import { MetricsComponent } from './metrics/metrics.component';
import { SyntaxHighlightService } from './syntax-highlight.service';
import { ConsumerMessagesComponent } from './consumer-messages/consumer-messages.component';
import { ConsumerMessagesListComponent } from './consumer-messages-list/consumer-messages-list.component';
import { ActionCableService } from 'angular2-actioncable';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavContentComponent,
    ClustersComponent,
    ProducerComponent,
    ConsumerComponent,
    KafkaClusterComponent,
    TopicComponent,
    BrokerDetailsPipe,
    NewClusterDialogComponent,
    ConsumerMessageItemComponent,
    NewTopicDialogComponent,
    GroupComponent,
    ChartComponent,
    BrokersComponent,
    BrokerMetricsComponent,
    MetricsComponent,
    ConsumerMessagesComponent,
    ConsumerMessagesListComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [
    ClusterService,
    KafkaClusterService,
    ProducerService,
    ConsumerService,
    TopicService,
    GroupService,
    BrokerService,
    SyntaxHighlightService
  ],
  entryComponents: [
    NewClusterDialogComponent,
    NewTopicDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
