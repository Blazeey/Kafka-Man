import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TopicService {

    constructor(private http: HttpClient) {
    }

    public listTopics(clusterName: string) {
        let url = Constants.TOPICS_DETAIL.replace(":name", clusterName);
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public createTopic(clusterName: string, topicName: string, partitions: number, replication: number, configs: {}) {
        let url = Constants.CREATE_TOPIC.replace(':name', clusterName);
        let data = {
            topic_name: topicName,
            partitions: partitions,
            replication: replication,
            configs: configs
        }
        return this.http.post(url, data).pipe(map((response: {[key: string]: any}) => response));
    }

    public listTopicConfigs() {
        let url = Constants.LIST_TOPIC_CONFIGS;
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public deleteTopic(clusterName: string, topic: string) {
        let url = Constants.DELETE_TOPIC.replace(':name', clusterName).replace(':topic', topic);
        return this.http.delete(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public getTopicConfigs(clusterName: string, topicName: string) {
        let url = Constants.TOPIC_LEVEL_CONFIGS.replace(':name', clusterName).replace(':topic', topicName);
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    public searchTopics(clusterName: string, search: string, page: number) {
        let url = Constants.SEARCH_TOPICS.replace(':name', clusterName);
        let data = {
            search: search,
             page: page
        }
        return this.http.post(url, data).pipe(map((response: {[key: string]: any}) => response));
    }
}