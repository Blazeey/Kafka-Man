import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Pipe({
  name: 'brokerDetails'
})
export class BrokerDetailsPipe implements PipeTransform {

  transform(value: []): any {
    let brokers = '';
    value.forEach(broker => {
      brokers = brokers + (<string>broker['host']).trim() + ':' + broker['port'] + '\n';
    })
    brokers = brokers.substr(0, brokers.length - 1).trim();
    return brokers;
  }

}
