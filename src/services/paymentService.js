import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API}/payments`;

// Fungsi untuk mengambil pembayaran dengan filter, pencarian, & pagination
export const getFilteredPayments = async ({ page = 0, size = 5, paymentStatus = "", studentName = "", paymentName = "" }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
  }

  try {
    const params = new URLSearchParams({ page, size });
    if (paymentStatus) params.append("paymentStatus", paymentStatus);
    if (studentName) params.append("studentName", studentName);
    if (paymentName) params.append("paymentName", paymentName);

    const response = await axios.get(`${API_URL}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching filtered payments:", error);
    throw error;
  }
};

// Mengupdate status pembayaran berdasarkan paymentId
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

// Fungsi untuk mengunduh file Excel pembayaran
export const downloadExcel = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
  }

  try {
    const response = await axios.get(`${API_URL}/export`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob", // Penting agar bisa menerima file binary
    });

    const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.xlsx"; // Nama file hasil unduhan
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error saat mengunduh file:", error);
    throw error;
  }
};
