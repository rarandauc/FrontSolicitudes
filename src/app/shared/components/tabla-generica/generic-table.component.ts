import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  template?: TemplateRef<any>;
  width?: string;
}

export interface TableAction {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  action: (item: any) => void;
  condition?: (item: any) => boolean;
}

@Component({
  selector: 'app-generic-table',
  template: `
    <div class="table-container">
      <mat-table [dataSource]="data" class="mat-elevation-8">
        
        <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
          <mat-header-cell *matHeaderCellDef [style.width]="column.width">
            <span>{{ column.label }}</span>
            <mat-icon *ngIf="column.sortable" 
                     class="sort-icon"
                     (click)="onSort(column.key)">
              {{ getSortIcon(column.key) }}
            </mat-icon>
          </mat-header-cell>
          
          <mat-cell *matCellDef="let element" [style.width]="column.width">
            <ng-container *ngIf="!column.template">
              {{ getNestedValue(element, column.key) }}
            </ng-container>
            <ng-container *ngIf="column.template"
                         [ngTemplateOutlet]="column.template"
                         [ngTemplateOutletContext]="{ $implicit: element }">
            </ng-container>
          </mat-cell>
        </ng-container>

        <!-- Columna de acciones -->
        <ng-container matColumnDef="actions" *ngIf="actions.length > 0">
          <mat-header-cell *matHeaderCellDef>Acciones</mat-header-cell>
          <mat-cell *matCellDef="let element">
            <button *ngFor="let action of getAvailableActions(element)"
                    mat-icon-button
                    [color]="action.color"
                    [matTooltip]="action.label"
                    (click)="action.action(element)">
              <mat-icon>{{ action.icon }}</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;" 
                (click)="onRowClick(row)"
                [class.clickable]="rowClickable">
        </mat-row>
      </mat-table>

      <!-- Paginación -->
      <mat-paginator *ngIf="showPagination"
                     [pageSize]="pageSize"
                     [pageSizeOptions]="pageSizeOptions"
                     [length]="totalItems"
                     [pageIndex]="currentPage"
                     (page)="onPageChange($event)">
      </mat-paginator>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Sin datos -->
      <div *ngIf="!loading && data.length === 0" class="no-data">
        <mat-icon>inbox</mat-icon>
        <p>No hay datos para mostrar</p>
      </div>
    </div>
  `,
  styleUrls: []
})
export class GenericTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() showPagination = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50];
  @Input() totalItems = 0;
  @Input() currentPage = 0;
  @Input() rowClickable = false;
  @Input() pagination: boolean = false;
  @Input() filter: boolean = false;
  
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  @Output() pageChange = new EventEmitter<{ pageIndex: number }>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<string>();

  currentSort = { column: '', direction: '' };

  get displayedColumns(): string[] {
    const columns = this.columns.map(col => col.key);
    if (this.actions.length > 0) {
      columns.push('actions');
    }
    return columns;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }

  onSort(column: string): void {
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }
    
    this.sortChange.emit({
      column: this.currentSort.column,
      direction: this.currentSort.direction as 'asc' | 'desc'
    });
  }

  getSortIcon(column: string): string {
    if (this.currentSort.column !== column) return 'sort';
    return this.currentSort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  onPageChange(event: any): void {
    this.pageChange.emit({
      pageIndex: event.pageIndex
    });
  }

  onRowClick(row: any): void {
    if (this.rowClickable) {
      this.rowClick.emit(row);
    }
  }

  onFilterChange(filter: string): void {
    this.filterChange.emit(filter);
  }

  getAvailableActions(item: any): TableAction[] {
    return this.actions.filter(action => 
      !action.condition || action.condition(item)
    );
  }
}