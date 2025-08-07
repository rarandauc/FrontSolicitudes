import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudesService } from './solicitudes.service';
import { environment } from '../../../environments/environment';
import { Solicitud, PrioridadSolicitud } from '../models/solicitud.interface';

describe('SolicitudesService', () => {
  let service: SolicitudesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudesService]
    });
    service = TestBed.inject(SolicitudesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch solicitudes', () => {
    const mockSolicitudes: Solicitud[] = [
      { 
        id: 1, 
        titulo: 'Solicitud 1', 
        numeroSolicitud: 'SOL-001',
        tipoSolicitudId: 1,
        usuarioSolicitanteId: 1,
        estadoId: 1,
        datosEspecificos: {},
        fechaSolicitud: new Date(),
        prioridad: PrioridadSolicitud.Media
      }
    ];

    service.getAll().subscribe(response => {
      expect(response.data).toEqual(mockSolicitudes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/solicitudes`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockSolicitudes, success: true });
  });
});