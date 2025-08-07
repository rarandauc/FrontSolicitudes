import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesListComponent } from './components/solicitudes-list/solicitudes-list.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import { SolicitudDetailComponent } from './components/solicitud-detail/solicitud-detail.component';

const routes: Routes = [
  { path: '', component: SolicitudesListComponent },
  { path: 'nueva', component: SolicitudFormComponent },
  { path: ':id', component: SolicitudDetailComponent },
  { path: ':id/editar', component: SolicitudFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
