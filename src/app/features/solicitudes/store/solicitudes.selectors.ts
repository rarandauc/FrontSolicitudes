import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SolicitudesState } from './solicitudes.state';

export const selectSolicitudesState = createFeatureSelector<SolicitudesState>('solicitudes');

export const selectAllSolicitudes = createSelector(
  selectSolicitudesState,
  (state) => state.solicitudes
);

export const selectSolicitudesLoading = createSelector(
  selectSolicitudesState,
  (state) => state.loading
);

export const selectSolicitudesError = createSelector(
  selectSolicitudesState,
  (state) => state.error
);

export const selectSelectedSolicitud = createSelector(
  selectSolicitudesState,
  (state) => state.selectedSolicitud
);

export const selectSolicitudesPagination = createSelector(
  selectSolicitudesState,
  (state) => ({
    currentPage: state.currentPage,
    totalPages: state.totalPages
  })
);