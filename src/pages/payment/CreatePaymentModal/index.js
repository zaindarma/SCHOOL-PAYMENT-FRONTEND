import { createPayment } from "@/services/paymentService";
import React, { useState } from "react"; // Adjust the path

const CreatePaymentModal = ({ isOpen, onClose, onPaymentCreated }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    paymentTypeId: "",
    paymentName: "",
    amount: "",
    paymentStatus: "PENDING", // Default status
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await createPayment(formData, token);
      setMessage("Payment successfully created!");
      onPaymentCreated(); // Refresh parent data
      setTimeout(() => {
        onClose(); // Close modal
      }, 1500);
    } catch (error) {
      setMessage("Failed to create payment.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Create Payment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="paymentTypeId"
            placeholder="Payment Type ID"
            value={formData.paymentTypeId}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="paymentName"
            placeholder="Payment Name"
            value={formData.paymentName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Payment"}
          </button>
        </form>

        {message && <p className="text-center text-sm mt-2">{message}</p>}

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentModal;
