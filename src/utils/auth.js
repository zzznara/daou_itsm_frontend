// src/utils/auth.js
export function isAuthenticated() {
  return localStorage.getItem("userToken") !== null; // 로그인 시 토큰 저장
}

export function login(token) {
  localStorage.setItem("userToken", token);
}

export function logout() {
  localStorage.removeItem("userToken");
}
