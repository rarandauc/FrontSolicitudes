import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioridadColor',
  standalone: true
})
export class PrioridadColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
