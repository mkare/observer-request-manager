// observer.ts
import { Observer, RequestState } from "./types";

// DataObserver class implements the Observer interface for RequestState
export class DataObserver implements Observer<RequestState> {
  private data: RequestState | null = null; // Stores the current request state
  private displayElement: HTMLDivElement | null = null; // Element to display data

  constructor(
    private changeHandler: (state: RequestState) => void, // Function to handle state changes
    private dataElementId: string // ID of the element to display data
  ) {
    this.displayElement = document.getElementById(
      this.dataElementId
    ) as HTMLDivElement; // Get the display element by ID
  }

  // Update method to receive new state
  update(state: RequestState) {
    this.data = state; // Store the new state
    this.displayData(); // Call method to display the data
  }

  // Display the current data in the HTML element
  displayData() {
    if (this.displayElement && this.data?.data) {
      this.displayElement.innerText = JSON.stringify(this.data.data); // Display data as string
    }

    this.changeHandler(this.data); // Call the change handler with the current data
  }
}
