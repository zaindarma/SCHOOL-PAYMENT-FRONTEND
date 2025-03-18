import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

//endpoint /classes/all
export async function getAllClasses(token) {
  try {
    const response = await axios.get(`${api}/classes/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    console.log("Failed to fetch classes");
    return err;
  }
}
