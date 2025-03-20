import axios from "axios";

const api = process.env.NEXT_PUBLIC_API;
export async function getAllSchoolYear(token) {
  try {
    const response = await axios.get(`${api}/school-years/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch school year");
    return err;
  }
}
