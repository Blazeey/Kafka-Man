import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Parameter } from './producer.component';

@Injectable()
export class ProducerService {
    constructor(private http: HttpClient) {}

    public pushMessage(
        clusterName: string, 
        topic: string, 
        message: any,
        type: string,
        headers: {},
        key: string,
        partitioning: string, 
        partitioningValue: any,
        compression: string,
        count: number) {
        let url = Constants.PRODUCE_MESSAGE.replace(':name', clusterName);
        let body = {
            message: message,
            topic: topic,
            type: type,
            headers: headers,
            compression: compression,
            count: count
        }
        if(partitioning != '')
            body[partitioning] = partitioningValue;
        if(partitioning == 'partition') body[partitioning] = +body[partitioning];
        if(key != '' && key !== undefined && key !== null)
            body['key'] = key;
        return this.http.post(url, body).pipe(map((response: {[key: string]: any}) => response));
    }
 }