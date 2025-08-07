import { createReducer, on } from '@ngrx/store';
import { initialSolicitudesState } from './solicitudes.state';
import * as SolicitudesActions from './solicitudes.actions';

export const solicitudesReducer = createReducer(
  initialSolicitudesState,
  
  on(SolicitudesActions.loadSolicitudes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(SolicitudesActions.loadSolicitudesSuccess, (state, { response }) => ({
    ...state,
    solicitudes: response.data,
    totalPages: response.totalPages,
    currentPage: response.pageNumber,
    loading: false,
    error: null
  })),
  
  on(SolicitudesActions.loadSolicitudesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(SolicitudesActions.selectSolicitud, (state, { solicitud }) => ({
    ...state,
    selectedSolicitud: solicitud
  })),
  
  on(SolicitudesActions.createSolicitudSuccess, (state, { solicitud }) => ({
    ...state,
    solicitudes: [...state.solicitudes, solicitud],
    loading: false,
    error: null
  }))
);