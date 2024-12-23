export interface ApiResponseI<T> {
  message?: string;
  data?: T;
}

export interface ApiErrorI {
  name: string;
  message: string;
}
