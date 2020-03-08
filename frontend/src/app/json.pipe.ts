import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonc'
})
export class JsonPipe implements PipeTransform {

  transform(value: any): any {
    let data: any;
    try {
      data = JSON.parse(value);
    } catch(e) {
      data = value;
    }
     
    return data;
  }

}
