// requestManager.ts
import {
  Observer,
  RequestState,
  ResponseData,
  RequestMethod,
  RequestStatus,
} from "./types";

// RequestManager class manages HTTP requests and observers
export class RequestManager {
  private observers: Observer<RequestState>[] = []; // List of observers to notify
  private state: RequestState = { status: RequestStatus.IDLE, error: null }; // Initial request state

  // Add an observer to the list
  addObserver(observer: Observer<RequestState>) {
    this.observers.push(observer); // Push the observer to the list
  }

  // Remove an observer from the list
  removeObserver(observer: Observer<RequestState>) {
    this.observers = this.observers.filter((obs) => obs !== observer); // Filter out the observer
  }

  // Notify all observers of a state change
  private notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.state)); // Call update on each observer
  }

  // Update the state and notify observers
  setState(state: Partial<RequestState>) {
    this.state = { ...this.state, ...state }; // Merge new state with existing state
    this.notifyObservers(); // Notify observers of the state change
  }

  // Get the current state
  getState() {
    return this.state; // Return the current request state
  }

  // Make an HTTP request and manage its state
  async makeRequest<T extends ResponseData>(
    method: RequestMethod,
    url: string,
    body?: unknown
  ): Promise<T> {
    this.setState({ status: RequestStatus.LOADING, error: null }); // Set loading state

    const options: RequestInit = {
      method: method, // Set HTTP method
      headers: {
        "Content-Type": "application/json", // Set content type
      },
      body: body ? JSON.stringify(body) : undefined, // Convert body to JSON if present
    };

    try {
      const response = await fetch(url, options); // Make the HTTP request
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
      }

      const data: T = await response.json(); // Parse the response as JSON
      this.setState({ status: RequestStatus.SUCCEEDED, data }); // Set succeeded state with data
      return data; // Return the response data
    } catch (error) {
      this.setState({
        status: RequestStatus.FAILED, // Set failed state
        error:
          error instanceof Error ? error.message : "An unknown error occurred.", // Capture error message
      });
      console.error("Request failed:", error); // Log the error
      throw error; // Rethrow the error
    }
  }
}
