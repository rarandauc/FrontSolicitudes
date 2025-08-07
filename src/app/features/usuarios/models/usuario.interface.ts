import { BaseEntity } from "app/core/models/base.interface";

export interface Usuario extends BaseEntity {
    id: number;
    nombre: string;
    nombreUsuario: string;
    nombreCompleto : string;  
    email: string;
    activo: boolean;
    departamento  :string;
    

  }