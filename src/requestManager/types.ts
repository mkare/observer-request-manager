// types.ts

// Observer interface for the observer pattern
export interface Observer<T> {
  update(state: T): void; // Update method for the observer
}

// RequestState interface for managing request states
export interface RequestState {
  status: RequestStatus; // Current request status
  error?: string | null; // Optional error message
  data?: unknown; // Optional fetched data
}

// ResponseData interface for API response structure
export interface ResponseData {
  [key: string]: unknown; // Generic response data structure
}

// Enum for HTTP request methods
export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// Enum for request status
export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
