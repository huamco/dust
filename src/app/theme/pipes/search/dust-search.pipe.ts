import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DustSearchPipe', pure: false })
export class DustSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(dust => {
        if (dust.dustName) {
          return dust.dustName.search(searchText) !== -1;
        }
        else{
          return dust.dustName.search(searchText) !== -1;
        }
      });
    }
  }
}
