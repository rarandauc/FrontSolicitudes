import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoSolicitud',
  standalone: true
})
export class EstadoSolicitudPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
