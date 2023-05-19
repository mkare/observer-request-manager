import { Observer, RequestState, ResponseData, RequestMethod } from "./types";
export declare class RequestManager {
    private observers;
    private state;
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    private notifyObservers;
    setState(state: Partial<RequestState>): void;
    getState(): RequestState;
    makeRequest(method: RequestMethod, url: string, body?: unknown): Promise<ResponseData>;
}
