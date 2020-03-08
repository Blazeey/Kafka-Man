import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { map } from 'rxjs/operators';

@Injectable()
export class ClusterService {
    constructor(private http: HttpClient) { }

    public getClusterList() {
        return this.http.get(Constants.LIST_CLUSTERS).pipe(map((response: {[key: string]: any}) => response));
    }

    public listTopics(clusterName: string) {
        let url = Constants.LIST_TOPICS.replace(':name', clusterName);
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public getTopicsList() {
        let url = Constants.GET_TOPICS_LIST;
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public addCluster(clusterName: string, brokers: string) {
        let data = {
            cluster: {
                cluster_name: clusterName,
                broker_uri: brokers
            }
        }
        let url = Constants.ADD_CLUSTER;
        return this.http.post(url, data).pipe(map((response: {[key: string]: any}) => response));
    }

    public deleteCluster(clusterName: string) {
        let url = Constants.DELETE_CLUSTER.replace(':name', clusterName);
        return this.http.delete(url).pipe(map((response: {[key: string]: any}) => response));
    }
}