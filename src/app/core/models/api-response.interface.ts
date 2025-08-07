export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
    errors?: string[];
  }
  
  export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  }