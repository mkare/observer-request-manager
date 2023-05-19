import { DataObserver } from "./requests/observer";
import { RequestState } from "./requests/types";
import { StateDisplay } from "./requests/stateDisplay";
import {
  getPosts,
  getPostComments,
  getCommentsByPostId,
  createPost,
  updatePost,
  deletePost,
  getTodos,
  createTodo,
} from "./requests/api";

const stateDisplay = new StateDisplay();

// You can change the parent element like this:
stateDisplay.parent = document.getElementById("status");
stateDisplay.data = document.getElementById("data");

const observer = new DataObserver((state: RequestState) => {
  stateDisplay.update(state);
}, "data");

// Handle API request
function handleRequest(promise: Promise<any>) {
  const loadingState: RequestState = {
    status: "loading",
    error: null,
    data: null,
  };
  observer.update(loadingState);

  promise
    .then(handleResponse)
    .catch(handleError)
    .finally(() => {
      console.log("Request complete!");
    });
}

// Assign button event listeners
document.getElementById("getPosts")?.addEventListener("click", () => {
  handleRequest(getPosts());
});

document.getElementById("getPostComments")?.addEventListener("click", () => {
  handleRequest(getPostComments(1)); // hardcoded post id 1 for simplicity
});

document
  .getElementById("getCommentsByPostId")
  ?.addEventListener("click", () => {
    handleRequest(getCommentsByPostId(1)); // hardcoded post id 1 for simplicity
  });

document.getElementById("createPost")?.addEventListener("click", () => {
  handleRequest(
    createPost({
      title: "foo",
      body: "bar",
      userId: 1,
    })
  ); // hardcoded post data for simplicity
});

document.getElementById("patchPost")?.addEventListener("click", () => {
  handleRequest(
    updatePost(1, {
      title: "foo",
    })
  ); // hardcoded post id 1 and update data for simplicity
});

document.getElementById("deletePost")?.addEventListener("click", () => {
  handleRequest(deletePost(1)); // hardcoded post id 1 for simplicity
});

document.getElementById("getTodos")?.addEventListener("click", () => {
  handleRequest(getTodos());
});

document.getElementById("createTodo")?.addEventListener("click", () => {
  handleRequest(
    createTodo({
      title: "foo",
      completed: false,
    })
  ); // hardcoded todo data for simplicity
});

// Handle API response
function handleResponse(responseData: any) {
  const requestState: RequestState = {
    status: "succeeded",
    error: null,
    data: responseData,
  };
  observer.update(requestState);
}

// Handle API error
function handleError(error: { message: any }) {
  const requestState: RequestState = {
    status: "failed",
    error: error.message,
    data: null,
  };
  observer.update(requestState);
}
