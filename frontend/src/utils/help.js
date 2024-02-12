const baseURL = "http://localhost:5000/api/";

export function callAuth(path, method, fetchOptions) {
  return fetch(`${baseURL}${path}`, {
    method,
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
