import * as ActionCable from 'actioncable';
import { Constants } from './../app.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ConsumerService {

    cable: ActionCable.Cable;
    subscriptions: ActionCable.Subscriptions;
    channel: ActionCable.Channel;

    constructor(private http: HttpClient) { 
        this.cable = ActionCable.createConsumer(Constants.CONSUME_MESSAGE_ACTION_CABLE);
    }

    consume(clusterName: string, topic: string, messageType: string,
        keyType: string, startFilter: string, startFilterValue: string,
        callback: (message: string) => any) {

        let url = Constants.CONSUMER_MESSAGE.replace(':name', clusterName);

        let params = {
            cluster_name: clusterName,
            topic: topic,
            message_type: messageType,
            key_type: keyType,
            start_filter: startFilter,
            start_filter_value: startFilterValue
        };
        let options = {
            params: params
        }

        this.channel = this.cable.subscriptions.create({
            channel: Constants.CONSUMER_CHANNEL,
            ...params
        }, {
            connected: () => {
                this.connected;
                this.http.get(url, options).pipe(map((response: {[key: string]: any}) => response))
                .pipe(catchError(error => of('ERROR', error)))
                .subscribe(response => {
                    console.log(response);
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
        this.channel.unsubscribe();
        this.cable.disconnect();
    }

    private connected() {
        console.log('Connected!');
    }

    private disconnected() {
        console.log('Disconnected!');
    }

    private received(message: any) {
        console.log('Received ' + message);
    }
}