import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { map } from 'rxjs/operators';

@Injectable()
export class KafkaClusterService {
    constructor(private http: HttpClient) { }

    public getClusterList() {
        return this.http.get(Constants.LIST_CLUSTERS).pipe(map((response: {[key: string]: any}) => response));
    }

    public describeCluster(clusterName: string) {
        let url = Constants.DESCRIBE_CLUSTER.replace(":name", clusterName);
        return this.http.get((url)).pipe(map((response: {[key: string]: any}) => response));
    }

    public getDefaultCluster() {
        let url = Constants.DEFAULT_CLUSTER;
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public getClusters() {
        let url = Constants.CLUSTER_NAMES;
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }
}