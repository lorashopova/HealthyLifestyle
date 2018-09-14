import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grams'
})
export class GramsPipe implements PipeTransform {

  transform(value: string) {
    return value + ' gr';
  }

}
