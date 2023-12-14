export function isUserLoggedIn() {
  return localStorage.getItem("user") !== null;
}

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("user"));
}
