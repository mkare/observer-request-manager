import { RequestState } from "./types";

export class ResponseManager {
  static async handleResponse(response: Response): Promise<RequestState> {
    const responseBody = await response.text();

    if (response.status >= 200 && response.status < 300) {
      return { status: "succeeded", data: JSON.parse(responseBody) };
    } else {
      const errorData = JSON.parse(responseBody);
      if (response.status === 401) {
        return { status: "unauthorized", error: errorData.error };
      } else if (response.status === 403) {
        return { status: "forbidden", error: errorData.error };
      } else if (response.status === 404) {
        return { status: "not-found", error: errorData.error };
      } else if (response.status >= 500 && response.status < 600) {
        return { status: "failed", error: errorData.error };
      } else {
        return {
          status: "failed",
          error: `Unexpected status code: ${response.status}`,
        };
      }
    }
  }
}
