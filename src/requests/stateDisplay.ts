import { RequestState } from "./types";

export class StateDisplay {
  private parentElement: HTMLElement;
  private elements: { [key: string]: HTMLElement };
  private dataElement: HTMLElement;

  constructor(
    parentElement: HTMLElement = document.body,
    dataElement: HTMLElement = document.createElement("div")
  ) {
    this.parentElement = parentElement;
    this.dataElement = dataElement;
    this.dataElement.id = "data";
    this.elements = {};
    this.parentElement.appendChild(this.dataElement);
  }

  public set parent(newParent: HTMLElement) {
    this.parentElement = newParent;
  }

  public set data(newDataElement: HTMLElement) {
    this.dataElement = newDataElement;
  }

  private createElement(state: string): HTMLElement {
    const element = document.createElement("div");
    element.id = state;
    element.style.display = "none";

    switch (state) {
      case "idle":
        element.innerText = "Idle...";
        break;
      case "loading":
        element.innerText = "Loading...";
        break;
      case "succeeded":
        element.innerText = "Request succeed!";
        break;
      case "failed":
        element.innerText = "Request failed!";
        break;
      case "not-found":
        element.innerText = "Not found!";
        break;
      default:
        break;
    }

    this.parentElement.appendChild(element);
    return element;
  }

  public update(state: RequestState): void {
    // Create the element for the current state if it doesn't already exist
    if (!this.elements[state.status]) {
      this.elements[state.status] = this.createElement(state.status);
    }

    // Hide all elements
    for (let key in this.elements) {
      this.elements[key].style.display = "none";
    }

    // Show the element for the current state
    this.elements[state.status].style.display = "block";

    if (state.status === "succeeded") {
      // Display data if the request succeeded
      if (typeof state.data === "string") {
        this.dataElement.innerText = state.data;
      } else {
        this.dataElement.innerText = JSON.stringify(state.data, null, 2);
      }
    } else {
      // Clear data for other states
      this.dataElement.innerText = "";
    }
  }
}
