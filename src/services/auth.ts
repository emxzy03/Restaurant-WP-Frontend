import http from "./axios";
function login(username: string, password: string) {
  return http.post("/auth/login", { username, password });
}
export default { login };
