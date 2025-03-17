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
    const response = await axios.get(`${api}/users/filter?role=${role}&page=${page}&size=${size}`, {
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
    const response = await axios.put(`${api}/users/delete/${id}`, {
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

export async function updateUser(id, { email, password, profilePicture, confirmPassword }, token) {
  try {
    const payload = {};

    if (email) payload.email = email;
    if (password) payload.password = password;
    if (profilePicture) payload.profilePicture = profilePicture;
    if (confirmPassword) payload.confirmPassword = confirmPassword;

    const response = await axios.put(`${api}/users/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to update user");
    return err;
  }
}
