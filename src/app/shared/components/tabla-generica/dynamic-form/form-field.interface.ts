export interface FormField {
    key: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
    required?: boolean;
    placeholder?: string;
    options?: { value: any; label: string }[];
    validators?: any[];
    errorMessages?: { [key: string]: string };
    readonly?: boolean;
    rows?: number; // Para textarea
  }