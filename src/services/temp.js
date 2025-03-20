import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API}/payments`;

// Fungsi untuk mengambil pembayaran dengan filter, pencarian, & pagination
export const getFilteredPayments = async ({
  page = 0,
  size = 5,
  paymentStatus = "",
  studentName = "",
  paymentName = "",
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
  }

  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);
    if (paymentStatus) params.append("paymentStatus", paymentStatus);
    if (studentName) params.append("studentName", studentName); // Tambahkan search ke query params
    if (paymentName) params.append("paymentName", paymentName);

    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered payments:", error);
    throw error;
  }
};

/**
 * Mengupdate status pembayaran berdasarkan paymentId
 * @param {string} paymentId - ID pembayaran
 * @param {string} newStatus - Status baru (PENDING, COMPLETED, FAILED, REFUNDED)
 * @returns {Promise<Object>} - Data pembayaran yang diperbarui
 */
export const updatePaymentStatus = async (paymentId, newStatus) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
  }

  try {
    const response = await axios.put(
      `${API_URL}/status/${paymentId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
