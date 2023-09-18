import { RequestManager } from "./requestManager";
import { RequestMethod } from "./types";

const requestManager = new RequestManager();

export const getPosts = () => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    "https://jsonplaceholder.typicode.com/posts"
  );
};

export const getPost = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
};

export const getPostComments = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
};

export const getCommentsByPostId = (postId: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

export const createPost = (body: object) => {
  return requestManager.makeRequest(
    RequestMethod.POST,
    "https://jsonplaceholder.typicode.com/posts",
    body
  );
};

export const updatePost = (id: number, body: object) => {
  return requestManager.makeRequest(
    RequestMethod.PUT,
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    body
  );
};

export const patchPost = (id: number, body: object) => {
  return requestManager.makeRequest(
    RequestMethod.PATCH,
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    body
  );
};

export const deletePost = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.DELETE,
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
};

export const getTodos = () => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    "https://jsonplaceholder.typicode.com/todos"
  );
};

export const getTodo = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
};

export const createTodo = (body: object) => {
  return requestManager.makeRequest(
    RequestMethod.POST,
    "https://jsonplaceholder.typicode.com/todos",
    body
  );
};

// This endpoint requires authentication
// but it returns a 200 status code even if the token is invalid
// so we can't use the ResponseManager.handleResponse method
// to handle the response
// TODO: find a better way to handle this
export const privateResource = (token: string) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    "https://reqres.in/api/protectedresource",
    undefined,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};
