import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = process.env.NEXT_PUBLIC_API;

export const login = async (payload) => {
  try {
    const res = await axios.post(`${api}/users/login`, payload);
    return {
      status: true,
      token: res.data.data,
    };
  } catch (error) {
    console.log("Login failed : ", error);
    return {
      status: false,
      error,
    };
  }
};

export const register = async (payload) => {
  try {
    const res = await axios.post(`${api}/users/register`, payload);
    return {
      status: true,
      data: res.data.data,
    };
  } catch (error) {
    console.log("Register Failed : ", error);
    return {
      status: false,
      error,
    };
  }
};

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.sub || null;
  } catch (err) {
    console.log("Invalid token:", err);
    return null;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // Check if Token is Expired
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Remove token if expired
      return false;
    }
    return true;
  } catch (err) {
    console.log("Authentication check failed:", err);
    return false;
  }
}
export function isAdminUser() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    return decoded.role === "ADMIN"; // Check if isAdmin is true
  } catch (err) {
    console.log("Admin check failed:", err);
    return false;
  }
}

// Handle Logout
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

export async function refreshToken(token) {
  try {
    const response = await axios.get(`${api}/users/me/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to refresh token, logging out");
    logout(); // Redirect to login if refresh fails
    return null;
  }
}
