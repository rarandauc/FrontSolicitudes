import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <!-- Sidenav -->
      <mat-sidenav #drawer="matSidenav" class="sidenav"
                   fixedInViewport
                   [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
                   [mode]="(isHandset$ | async) ? 'over' : 'side'"
                   [opened]="(isHandset$ | async) === false">
        <mat-toolbar>Menú</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/solicitudes" routerLinkActive="active">
            <mat-icon>description</mat-icon>
            <span>Solicitudes</span>
          </a>
          <a mat-list-item routerLink="/usuarios" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Usuarios</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <!-- Contenido principal -->
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button type="button"
                  aria-label="Toggle sidenav"
                  mat-icon-button
                  (click)="drawer.toggle()"
                  *ngIf="isHandset$ | async">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="app-title">Sistema de Solicitudes</span>
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Cerrar Sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: []
})
export class MainLayoutComponent implements OnInit {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}