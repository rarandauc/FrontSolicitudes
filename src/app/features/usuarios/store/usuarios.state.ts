export interface UsuariosState {
  usuarios: any[]; // Cambiar `any` por el tipo adecuado si está disponible
  selectedUsuario: any | null; // Cambiar `any` por el tipo adecuado
  loading: boolean;
  error: string | null;
}

export const initialUsuariosState: UsuariosState = {
  usuarios: [],
  selectedUsuario: null,
  loading: false,
  error: null
};