import { Observer, RequestState, ResponseData, RequestMethod } from "./types";
import { ResponseManager } from "./responseManager";
export class RequestManager {
  private observers: Observer[] = [];
  private state: RequestState = { status: "idle", error: null };

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.state));
  }

  setState(state: Partial<RequestState>) {
    this.state = { ...this.state, ...state };
    this.notifyObservers();
  }

  getState() {
    return this.state;
  }

  async makeRequest(
    method: RequestMethod,
    url: string,
    body?: unknown,
    headers?: HeadersInit
  ) {
    this.setState({ status: "loading", error: null });

    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, options);
      const responseData = await ResponseManager.handleResponse(response);
      return responseData;
    } catch (error) {
      this.setState({ status: "failed", error: error.message });
    }
  }
}
