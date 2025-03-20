import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getAllClasses(page = 0, size = 10, token) {
  try {
    const response = await axios.get(`${api}/classes/all?page=${page}&size=${size}`, {
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

export async function getClassByName(page = 0, size = 10, name, token) {
  try {
    const response = await axios.get(`${api}/classes/search?classesName=${name}&page=${page}&size=${size}`, {
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

export async function createClasses({ classesName, schoolYearId }, token) {
  try {
    const response = await axios.post(
      `${api}/classes/create`,
      { classesName, schoolYearId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Failed to create classes");
    return err;
  }
}

export async function updateClasses({ id, classesName, schoolYearId }, token) {
  try {
    const response = await axios.put(
      `${api}/classes/update/${id}`,
      { classesName, schoolYearId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Failed to update classes");
    return err;
  }
}

export async function getClass(id, token) {
  try {
    const response = await axios.get(`${api}/classes/get/${id}`, {
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

export async function deleteClasses(id, token) {
  try {
    const response = await axios.delete(`${api}/classes/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to delete classes");
    return err;
  }
}
