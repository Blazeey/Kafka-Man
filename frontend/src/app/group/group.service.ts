import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constant';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ActionCable from 'actioncable';

@Injectable()
export class GroupService {

    cable: ActionCable.Cable;
    subscriptions: ActionCable.Subscriptions;
    channel: ActionCable.Channel;

    constructor(private http: HttpClient) { 
        this.cable = ActionCable.createConsumer(Constants.CONSUMER_LAG_ACTION_CABLE);
    }

    public listGroups(clusterName: string) {
        let url = Constants.LIST_GROUPS.replace(':name', clusterName);
        return this.http.get(url).pipe(map((response: {[key: string]: any}) => response));
    }

    consume(clusterName: string, group: string, callback: (message: string) => any) {

        let url = Constants.CONSUMER_LAG_MESSAGE
            .replace(':name', clusterName)
            .replace(':group', group);

        let params = {
            cluster_name: clusterName,
            group: group,
        };
        let options = {
            params: params
        }

        this.channel = this.cable.subscriptions.create({
            channel: Constants.CONSUMER_LAG_CHANNEL,
            ...params
        }, {
            connected: () => {
                this.connected;
                this.http.get(url, options).pipe(map((response: {[key: string]: any}) => response))
                .pipe(catchError(error => of('ERROR', error)))
                .subscribe(response => {
                    // console.log(response);
                })
            },
            disconnected: this.disconnected,
            received: (message) => {
                this.received(message)
                callback(message)
            }
        });
    }

    public stopConsuming() {
        this.cable.disconnect();
    }

    private connected() {
        console.log('Connected!');
    }

    private disconnected() {
        console.log('Disconnected!');
    }

    private received(message: any) {
        // console.log('Received ' + message);
    }
}