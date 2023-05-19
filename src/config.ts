const baseUrl = "https://jsonplaceholder.typicode.com";
export const getApiRoutes = () => {
  return {
    baseUrl,
    posts: `${baseUrl}/posts`,
    comments: `${baseUrl}/comments`,
    albums: `${baseUrl}/albums`,
    photos: `${baseUrl}/photos`,
    todos: `${baseUrl}/todos`,
    users: `${baseUrl}/users`,
  };
};
