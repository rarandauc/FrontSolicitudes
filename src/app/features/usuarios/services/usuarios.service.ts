import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { Usuario } from '../models/usuario.interface';
import { ApiResponse } from '../../../core/models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseHttpService<Usuario> {
  protected resourceUrl = 'usuarios';

  getUsuariosActivos(): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(this.getFullUrl('/activos'));
  }
}
