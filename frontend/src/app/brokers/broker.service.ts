import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { map } from 'rxjs/operators';

@Injectable()
export class BrokerService {
    constructor(private http: HttpClient) { }

    public getBrokerDetails(clusterName: string) {
        let url = Constants.BROKER_DETAILS.replace(':name', clusterName);
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }
}