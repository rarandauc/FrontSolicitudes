import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from '../../models/solicitud.interface';
import { SharedModule } from "app/shared/shared.module";

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './solicitudes-list.component.html',
  styleUrls: ['./solicitudes-list.component.scss']
})
export class SolicitudesListComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  columns = [
    { key: 'numeroSolicitud', label: 'Número de Solicitud' },
    { key: 'tipoSolicitud.nombre', label: 'Tipo de Solicitud' },
    { key: 'usuarioSolicitante.nombreCompleto', label: 'Usuario Solicitante' },
    { key: 'titulo', label: 'Título' },
    { key: 'estado.nombre', label: 'Estado' },
    { key: 'fechaSolicitud', label: 'Fecha de Solicitud' },
    { key: 'fechaVencimiento', label: 'Fecha de Vencimiento' },
    { key: 'prioridad', label: 'Prioridad' }
  ];

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(): void {
    this.solicitudesService.fetchSolicitudes().subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
  }

  onPageChange(page: number): void {
    console.log('Page changed to:', page);
    // paginación
  }

  onFilterChange(filter: string): void {
    console.log('Filter applied:', filter);
    //filtrado
  }
}
