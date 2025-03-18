import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;
export async function getAllStudent(page = 0, size = 10, token) {
  try {
    const response = await axios.get(
      `${api}/students?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log("Failed to fetch student");
    return err;
  }
}

export async function getStudentFilter(
  page = 0,
  size = 10,
  filters = {},
  token
) {
  try {
    const params = new URLSearchParams();

    // Add filters only if they exist
    if (filters.search) params.append("search", filters.search);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.sort) params.append("sort", filters.sort);

    // Add pagination parameters
    params.append("page", page);
    params.append("size", size);

    const response = await axios.get(
      `${api}/students/search?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response.data.data = response.data.content;
    return response.data;
  } catch (err) {
    console.log("Failed to fetch student:", err);
    return err;
  }
}

export async function getStudentById(id, token) {
  try {
    const response = await axios.get(`${api}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch student");
    return err;
  }
}
export async function createStudent(
  { nis, name, classId, birthdate, address, phoneNumber },
  token
) {
  try {
    const payload = {
      nis,
      name,
      classId,
      birthdate,
      address,
      phoneNumber,
    };
    const response = await axios.post(`${api}/students`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to create student");
    return err;
  }
}

export async function updateStudent(
  id,
  { nis, name, classId, birthdate, address, phoneNumber },
  token
) {
  try {
    const payload = {};
    if (nis) payload.nis = nis;
    if (name) payload.name = name;
    if (classId) payload.classId = classId;
    if (birthdate) payload.birthdate = birthdate;
    if (address) payload.address = address;
    if (phoneNumber) payload.phoneNumber = phoneNumber;
    const response = await axios.put(`${api}/students/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to update student");
    return err;
  }
}

export async function deleteStudent(id, token) {
  try {
    const response = await axios.delete(`${api}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to delete student");
    return err;
  }
}

//soft delete
export async function softDeleteStudent(id, token) {
  try {
    const response = await axios.put(`${api}/students/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to delete student");
    return err;
  }
}
