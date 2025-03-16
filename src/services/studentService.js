export async function getAllStudent(page = 0, size = 10, token) {
  try {
    const response = await axios.get(`${api}/student?page=${page}&size=${size}`, {
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

export async function createStudent({ nis, name, classId, birthdate, address, phoneNumber }, token) {
  try {
    const payload = {
      nis,
      name,
      classId,
      birthdate,
      address,
      phoneNumber,
    };
    const response = await axios.post(`${api}/student`, payload, {
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

export async function updateStudent(id, { nis, name, classId, birthdate, address, phoneNumber }, token) {
  try {
    const payload = {};
    if (nis) payload.nis = nis;
    if (name) payload.name = name;
    if (classId) payload.classId = classId;
    if (birthdate) payload.birthdate = birthdate;
    if (address) payload.address = address;
    if (phoneNumber) payload.phoneNumber = phoneNumber;
    const response = await axios.put(`${api}/student/${id}`, payload, {
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
    const response = await axios.delete(`${api}/student/${id}`, {
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
    const response = await axios.put(`${api}/student/delete/${id}`, {
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
