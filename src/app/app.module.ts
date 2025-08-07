import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { SolicitudesModule } from './features/solicitudes/solicitudes.module';

@NgModule({ 
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CoreModule,
    RouterModule,
    MatToolbarModule,
    AppComponent,
    SolicitudesModule
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }