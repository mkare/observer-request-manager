// observer.ts
import { Observer, RequestState } from "./types";

export class DataObserver implements Observer {
  private data: RequestState | null = null;
  private displayElement: HTMLDivElement | null = null;

  constructor(
    private changeHandler: (state: RequestState) => void,
    private dataElementId: string
  ) {
    this.displayElement = document.getElementById(
      this.dataElementId
    ) as HTMLDivElement;
  }

  update(state: RequestState) {
    this.data = state;
    this.displayData();
  }

  displayData() {
    if (this.displayElement && this.data?.data) {
      this.displayElement.innerText = JSON.stringify(this.data.data);
    }

    this.changeHandler(this.data);
  }
}
