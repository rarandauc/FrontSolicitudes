import { SolicitudesState } from '../features/solicitudes/store/solicitudes.state';
import { UsuariosState } from '../features/usuarios/store/usuarios.state';

export interface AppState {
  solicitudes: SolicitudesState;
  usuarios: UsuariosState;
}
