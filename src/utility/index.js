export function isUserLoggedIn() {
  return localStorage.getItem("user") !== null;
}
