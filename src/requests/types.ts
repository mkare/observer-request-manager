export interface Observer {
  update(state: RequestState): void;
}

export interface RequestState {
  status:
    | "idle"
    | "loading"
    | "succeeded"
    | "failed"
    | "cancelled"
    | "not-found"
    | "unauthorized"
    | "redirected"
    | "forbidden";
  error?: string | null;
  data?: unknown;
}

export interface ResponseState {
  status: number;
  statusText: string;
  headers: Headers;
  body: string;
}

export interface ResponseData {
  [key: string]: unknown;
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
