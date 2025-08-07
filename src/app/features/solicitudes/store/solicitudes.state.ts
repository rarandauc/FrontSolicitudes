import { Solicitud } from '../models/solicitud.interface';

export interface SolicitudesState {
  solicitudes: Solicitud[];
  selectedSolicitud: Solicitud | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

export const initialSolicitudesState: SolicitudesState = {
  solicitudes: [],
  selectedSolicitud: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1
};