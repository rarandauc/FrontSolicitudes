import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from './form-field.interface';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      
      <div *ngFor="let field of fields" class="form-field">
        
        <!-- Campo de texto, email, password, number -->
        <mat-form-field *ngIf="isInputField(field)" appearance="outline">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput
                 [type]="field.type"
                 [placeholder]="field.placeholder || ''"
                 [formControlName]="field.key"
                 [readonly]="field.readonly">
          <mat-error *ngIf="hasError(field.key)">
            {{ getErrorMessage(field) }}
          </mat-error>
        </mat-form-field>

        <!-- Campo de fecha -->
        <mat-form-field *ngIf="field.type === 'date'" appearance="outline">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput
                 [matDatepicker]="picker"
                 [formControlName]="field.key"
                 [readonly]="field.readonly">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="hasError(field.key)">
            {{ getErrorMessage(field) }}
          </mat-error>
        </mat-form-field>

        <!-- Campo select -->
        <mat-form-field *ngIf="field.type === 'select'" appearance="outline">
          <mat-label>{{ field.label }}</mat-label>
          <mat-select [formControlName]="field.key">
            <mat-option *ngFor="let option of field.options" [value]="option.value">
              {{ option.label }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="hasError(field.key)">
            {{ getErrorMessage(field) }}
          </mat-error>
        </mat-form-field>

        <!-- Campo textarea -->
        <mat-form-field *ngIf="field.type === 'textarea'" appearance="outline">
          <mat-label>{{ field.label }}</mat-label>
          <textarea matInput
                    [rows]="field.rows || 3"
                    [placeholder]="field.placeholder || ''"
                    [formControlName]="field.key"
                    [readonly]="field.readonly">
          </textarea>
          <mat-error *ngIf="hasError(field.key)">
            {{ getErrorMessage(field) }}
          </mat-error>
        </mat-form-field>

        <!-- Campo checkbox -->
        <mat-checkbox *ngIf="field.type === 'checkbox'"
                      [formControlName]="field.key">
          {{ field.label }}
        </mat-checkbox>

      </div>

      <!-- Botones -->
      <div class="form-actions" *ngIf="showActions">
        <button mat-button type="button" (click)="onCancel()">
          Cancelar
        </button>
        <button mat-raised-button 
                color="primary" 
                type="submit"
                [disabled]="form.invalid || submitting">
          <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
          <span>{{ submitLabel }}</span>
        </button>
      </div>

    </form>
  `,
  styleUrls: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() initialValues: any = {};
  @Input() submitLabel = 'Guardar';
  @Input() showActions = true;
  @Input() submitting = false;
  
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const group: any = {};

    this.fields.forEach(field => {
      const validators = this.getValidators(field);
      const initialValue = this.initialValues[field.key] || '';
      
      group[field.key] = [initialValue, validators];
    });

    this.form = this.fb.group(group);

    // Emitir cambios del formulario
    this.form.valueChanges.subscribe(value => {
      this.formChange.emit(value);
    });
  }

  private getValidators(field: FormField): any[] {
    const validators: any[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  isInputField(field: FormField): boolean {
    return ['text', 'email', 'password', 'number'].includes(field.type);
  }

  hasError(fieldKey: string): boolean {
    const field = this.form.get(fieldKey);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(field: FormField): string {
    const formField = this.form.get(field.key);
    
    if (formField?.errors) {
      const firstError = Object.keys(formField.errors)[0];
      
      if (field.errorMessages && field.errorMessages[firstError]) {
        return field.errorMessages[firstError];
      }

      // Mensajes por defecto
      switch (firstError) {
        case 'required':
          return `${field.label} es requerido`;
        case 'email':
          return 'Ingrese un email válido';
        case 'min':
          return `Valor mínimo: ${formField.errors['min'].min}`;
        case 'max':
          return `Valor máximo: ${formField.errors['max'].max}`;
        default:
          return 'Campo inválido';
      }
    }

    return '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  patchValue(values: any): void {
    this.form.patchValue(values);
  }
}