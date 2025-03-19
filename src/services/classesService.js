import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getAllClasses(page = 0, size = 10, token) {
  try {
    const response = await axios.get(
      `${api}/classes/all?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Failed to fetch classes");
    return err;
  }
}

export async function getClassByName(page = 0, size = 10, name, token) {
  try {
    const response = await axios.get(
      `${api}/classes/search?classesName=${name}&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Failed to fetch classes");
    return err;
  }
}
