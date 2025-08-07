import { DatosEspecificosSolicitud, PrioridadSolicitud } from "./solicitud.interface";

export interface SolicitudCreateDto {
    tipoSolicitudId: number;
    titulo: string;
    descripcion?: string;
    datosEspecificos: DatosEspecificosSolicitud;
    fechaVencimiento?: Date;
    prioridad: PrioridadSolicitud;
  }
  
  export interface SolicitudUpdateDto extends Partial<SolicitudCreateDto> {
    id: number;
  }