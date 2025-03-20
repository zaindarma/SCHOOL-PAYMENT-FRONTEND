import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;
export async function getPayment() {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) throw new Error("No token found");

    const response = await axios.get(`${api}/payments/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch user");
    return err;
  }
}

export async function createPayment(data, token) {
  try {
    const response = await axios.post(`${api}/payments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to create payment");
    return err;
  }
}
