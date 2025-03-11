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

export function getCurrentUser(token) {
  const decoded = jwtDecode(token);
  return decoded.sub;
}
