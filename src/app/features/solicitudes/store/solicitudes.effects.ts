import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { SolicitudesService } from '../services/solicitudes.service';
import * as SolicitudesActions from './solicitudes.actions';
import { Router } from '@angular/router';

@Injectable()
export class SolicitudesEffects {
  
  loadSolicitudes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitudesActions.loadSolicitudes),
      switchMap(({ page = 1, pageSize = 10, filters }) =>
        this.solicitudesService.getAll({ page, pageSize, ...filters }).pipe(
          map(response => SolicitudesActions.loadSolicitudesSuccess({ response })),
          catchError(error => of(SolicitudesActions.loadSolicitudesFailure({ error: error.message })))
        )
      )
    )
  );

  createSolicitud$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitudesActions.createSolicitud),
      switchMap(({ solicitud }) =>
        this.solicitudesService.createSolicitud(solicitud).pipe(
          map(response => SolicitudesActions.createSolicitudSuccess({ solicitud: response.data })),
          catchError(error => of(SolicitudesActions.createSolicitudFailure({ error: error.message })))
        )
      )
    )
  );

  createSolicitudSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SolicitudesActions.createSolicitudSuccess),
      tap(() => this.router.navigate(['/solicitudes']))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}
}