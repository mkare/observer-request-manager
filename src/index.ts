import { DataObserver } from "./requests/observer";
import { RequestState } from "./requests/types";
import { StateDisplay } from "./requests/stateDisplay";
import {
  getPost,
  getPosts,
  getPostComments,
  getCommentsByPostId,
  createPost,
  updatePost,
  deletePost,
  getTodos,
  createTodo,
  privateResource,
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
    .then((response) => {
      if (response.status === "not-found") {
        handleNotFound(response);
      } else {
        handleResponse(response);
      }
    })
    .catch(handleError)
    .finally(() => {
      console.log("Request complete!");
    });
}

// Handle API response
function handleResponse(responseData: any) {
  const successState: RequestState = {
    status: "succeeded",
    error: null,
    data: responseData,
  };
  observer.update(successState);
}

// Handle API error
function handleError(error: { status: string; message: any }) {
  const errorState: RequestState = {
    status: "failed",
    error: error.message,
    data: null,
  };
  observer.update(errorState);
}

// Handle API not found
function handleNotFound(responseData: any) {
  const notFoundState: RequestState = {
    status: "not-found",
    error: responseData.error,
    data: null,
  };
  observer.update(notFoundState);
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

document.getElementById("posts1000")?.addEventListener("click", () => {
  handleRequest(getPost(1000));
});

document.getElementById("privateResource")?.addEventListener("click", () => {
  handleRequest(privateResource("invalid-token"));
});
