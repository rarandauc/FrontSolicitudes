import { Usuario } from "app/features/usuarios/models/usuario.interface";
import { BaseEntity } from "../../../core/models/base.interface";

export enum PrioridadSolicitud {
    Baja = 'Baja',
    Media = 'Media',
    Alta = 'Alta'
  }
  
  export interface DatosEspecificosSolicitud {
    [key: string]: any;
  }
  
  export interface TipoSolicitud extends BaseEntity {
    id: number;
    codigo: string; 
    nombre: string;
    descripcion?: string;
  }
  
  export interface EstadoSolicitud extends BaseEntity {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
  }
  
  export interface Solicitud extends BaseEntity {
    numeroSolicitud: string;
    tipoSolicitudId: number;
    usuarioSolicitanteId: number;
    estadoId: number;
    titulo: string;
    descripcion?: string;
    datosEspecificos: DatosEspecificosSolicitud;
    fechaSolicitud: Date;
    fechaVencimiento?: Date;
    fechaRespuesta?: Date;
    usuarioAprobadorId?: number;
    comentarioAprobador?: string;
    prioridad: PrioridadSolicitud;   
    
    // Propiedades de navegación
    tipoSolicitud?: TipoSolicitud;
    usuarioSolicitante?: Usuario;
    estado?: EstadoSolicitud;
    usuarioAprobador?: Usuario;
    
  }