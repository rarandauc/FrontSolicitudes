import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { PrioridadSolicitud, Solicitud } from '../models/solicitud.interface';
import { SolicitudCreateDto, SolicitudUpdateDto } from '../models/solicitud-create.dto';
import { ApiResponse } from '../../../core/models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService extends BaseHttpService<Solicitud> {
  protected resourceUrl = 'solicitudes';

  createSolicitud(solicitud: SolicitudCreateDto): Observable<ApiResponse<Solicitud>> {
    return this.create(solicitud);
  }

  updateSolicitud(solicitud: SolicitudUpdateDto): Observable<ApiResponse<Solicitud>> {
    return this.update(solicitud.id, solicitud);
  }

  getSolicitudesPorUsuario(usuarioId: number): Observable<ApiResponse<Solicitud[]>> {
    return this.http.get<ApiResponse<Solicitud[]>>(
      this.getFullUrl(`/usuario/${usuarioId}`)
    );
  }

  aprobarSolicitud(id: number, comentario?: string): Observable<ApiResponse<Solicitud>> {
    return this.http.post<ApiResponse<Solicitud>>(
      this.getFullUrl(`/${id}/aprobar`),
      { comentario }
    );
  }

  rechazarSolicitud(id: number, comentario: string): Observable<ApiResponse<Solicitud>> {
    return this.http.post<ApiResponse<Solicitud>>(
      this.getFullUrl(`/${id}/rechazar`),
      { comentario }
    );
  }

  fetchSolicitudes(): Observable<Solicitud[]> {
    // Simulación de datos
    const solicitudes: Solicitud[] = [
      {
        id: 1,
        numeroSolicitud: '12345',
        tipoSolicitud: {
          id: 1,
          codigo: 'TS001',
          nombre: 'Tipo 1',
          descripcion: 'Descripción del tipo 1'          
        },
        usuarioSolicitante: {
          id: 1,
          nombreUsuario: 'usuario1',
          nombreCompleto: 'Usuario Uno',
          email: 'usuario1@example.com',
          departamento: 'Departamento 1',
          activo: true,
          nombre : 'Usuario Uno'
        },
        estado: {
          id: 1,
          codigo: 'E001',
          nombre: 'Pendiente',
          descripcion: 'Solicitud pendiente'
        },
        titulo: 'Solicitud de ejemplo',
        descripcion: 'Descripción de la solicitud',
        datosEspecificos: {},
        fechaSolicitud: new Date(),
        fechaVencimiento: new Date(),
        fechaRespuesta: new Date(),                
        prioridad: PrioridadSolicitud.Baja,
        estadoId:   1,
        tipoSolicitudId:1,
        usuarioSolicitanteId:1
      }
    ];
    return of(solicitudes);
  }
}