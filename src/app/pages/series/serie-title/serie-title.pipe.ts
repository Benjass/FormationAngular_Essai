import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serieTitle',
})
export class SerieTitlePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return 'The title of the serie is ' + value;
  }
}
