export interface ValidationErrorItem {
  [key: string]: string[];
}

export interface ValidationErrorContext {
  validationErrors: ValidationErrorItem;
}

export interface LoginErrorResponse {
  data: null;
  error: {
    message: string;
    context: ValidationErrorContext;
  };
}
