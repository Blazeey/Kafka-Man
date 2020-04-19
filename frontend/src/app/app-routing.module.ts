import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClustersComponent } from './clusters/clusters.component';
import { ProducerComponent } from './producer/producer.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { KafkaClusterComponent } from './kafka-cluster/kafka-cluster.component';
import { TopicComponent } from './topic/topic.component';
import { GroupComponent } from './group/group.component';
import { BrokersComponent } from './brokers/brokers.component';
import { MetricsComponent } from './metrics/metrics.component';


const routes: Routes = [
  { path: '', redirectTo: 'clusters', pathMatch: 'full' },
  { path: 'clusters', component: ClustersComponent },
  { path: 'producer', component: ProducerComponent },
  { path: 'consumer', component: ConsumerComponent },
  { path: 'topic', component: TopicComponent, pathMatch: 'prefix' },
  // { path: '**', redirectTo: 'clusters', pathMatch: 'full' },
  // { path: 'cluster/:name', component: KafkaClusterComponent },
  // { path: 'topic/:name', component: TopicComponent },
  { path: 'group', component: GroupComponent },
  // { path: 'brokers/:name', component: BrokersComponent },
  // { path: 'metrics/:name', component: MetricsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
