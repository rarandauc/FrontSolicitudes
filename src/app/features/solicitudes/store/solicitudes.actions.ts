import { createAction, props } from '@ngrx/store';
import { Solicitud } from '../models/solicitud.interface';
import { SolicitudCreateDto } from '../models/solicitud-create.dto';
import { PaginatedResponse } from '../../../core/models/api-response.interface';

export const loadSolicitudes = createAction(
  '[Solicitudes] Load Solicitudes',
  props<{ page?: number; pageSize?: number; filters?: any }>()
);

export const loadSolicitudesSuccess = createAction(
  '[Solicitudes] Load Solicitudes Success',
  props<{ response: PaginatedResponse<Solicitud> }>()
);

export const loadSolicitudesFailure = createAction(
  '[Solicitudes] Load Solicitudes Failure',
  props<{ error: string }>()
);

export const selectSolicitud = createAction(
  '[Solicitudes] Select Solicitud',
  props<{ solicitud: Solicitud }>()
);

export const createSolicitud = createAction(
  '[Solicitudes] Create Solicitud',
  props<{ solicitud: SolicitudCreateDto }>()
);

export const createSolicitudSuccess = createAction(
  '[Solicitudes] Create Solicitud Success',
  props<{ solicitud: Solicitud }>()
);

export const createSolicitudFailure = createAction(
  '[Solicitudes] Create Solicitud Failure',
  props<{ error: string }>()
);