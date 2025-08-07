import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ApiResponse, PaginatedResponse } from '../models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService<T> {
  protected abstract resourceUrl: string;

  constructor(protected http: HttpClient) {}

  protected getFullUrl(endpoint: string = ''): string {
    return `${environment.apiUrl}/${this.resourceUrl}${endpoint}`;
  }

  getAll(params?: any): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<PaginatedResponse<T>>(this.getFullUrl(), { params: httpParams })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.getFullUrl(`/${id}`))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  create(entity: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.getFullUrl(), entity)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, entity: Partial<T>): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(this.getFullUrl(`/${id}`), entity)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(this.getFullUrl(`/${id}`))
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
    }
    
    console.error('Error en petición HTTP:', error);
    return throwError(() => new Error(errorMessage));
  }
}