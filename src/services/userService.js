import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;
export async function getAllUser(page = 0, size = 10, token) {
  try {
    const response = await axios.get(`${api}/users?page=${page}&size=${size}`, {
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

export async function me(token) {
  try {
    const response = await axios.get(`${api}/users/me`, {
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

export async function getUserById(id, token) {
  try {
    const response = await axios.get(`${api}/users/${id}`, {
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

export async function getAllUserFilter(page, size, role, token) {
  try {
    const response = await axios.get(
      `${api}/users/filter?role=${role}&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Failed to fetch user");
    return err;
  }
}

export async function updateRole(id, role, token) {
  try {
    const response = await axios.put(
      `${api}/users/role/${id}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Failed update role");
    return err;
  }
}

export async function softDeleteUser(id, token) {
  try {
    const response = await axios.put(
      `${api}/users/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Failed delete user");
    return err;
  }
}

export async function hardDeleteUser(id, token) {
  try {
    const response = await axios.delete(`${api}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed delete user");
    return err;
  }
}

export async function updateUser({ email, password, confirmPassword }, token) {
  try {
    const formData = new FormData();

    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (confirmPassword) formData.append("confirmPassword", confirmPassword);

    const response = await axios.put(`${api}/users`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Important for FormData
      },
    });

    return response.data;
  } catch (err) {
    console.log("Failed to update user", err);
    return err;
  }
}
