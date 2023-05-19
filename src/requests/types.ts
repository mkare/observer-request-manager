export interface Observer {
  update(state: RequestState): void;
}

export interface RequestState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  data?: unknown;
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
