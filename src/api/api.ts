// api.ts
// Requests to the JSONPlaceholder API
import { RequestManager } from "../requestManager/requestManager";
import { RequestMethod, ResponseData } from "../requestManager/types";

// Post interface
export interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

// Todo interface
export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

// Instantiate RequestManager
const requestManager = new RequestManager();

// Request handler type
type RequestHandler<T> = (body: T) => Promise<ResponseData>;

// Fetch all posts
export const getPosts = () => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    "https://jsonplaceholder.typicode.com/posts"
  );
};

// Fetch a single post by ID
export const getPost = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
};

// Fetch comments for a specific post by ID
export const getPostComments = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
};

// Fetch comments filtered by post ID
export const getCommentsByPostId = (postId: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

// Create a new post
export const createPost: RequestHandler<Post> = async (body) => {
  return requestManager.makeRequest(
    RequestMethod.POST,
    "https://jsonplaceholder.typicode.com/posts",
    body
  );
};

// Update an existing post by ID
export const updatePost = (id: number, body: object) => {
  return requestManager.makeRequest(
    RequestMethod.PUT,
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    body
  );
};

// Partially update an existing post by ID
export const patchPost = (id: number, body: object) => {
  return requestManager.makeRequest(
    RequestMethod.PATCH,
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    body
  );
};

// Delete a post by ID
export const deletePost = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.DELETE,
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
};

// Fetch all todos
export const getTodos = () => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    "https://jsonplaceholder.typicode.com/todos"
  );
};

// Fetch a single todo by ID
export const getTodo = (id: number) => {
  return requestManager.makeRequest(
    RequestMethod.GET,
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
};

// Create a new todo
export const createTodo = (body: object) => {
  return requestManager.makeRequest(
    RequestMethod.POST,
    "https://jsonplaceholder.typicode.com/todos",
    body
  );
};
