import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API}/school-years`;

export const getSchoolYears = async (page) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      size: 10,
    },
  });
  return response.data.data;
};

export const createSchoolYear = async (newSchoolYear) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/create`, newSchoolYear, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateSchoolYear = async (id, updatedSchoolYear) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/update/${id}`, updatedSchoolYear, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteSchoolYear = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchSchoolYear = async (schoolYear) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/search?schoolYear=${schoolYear}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
