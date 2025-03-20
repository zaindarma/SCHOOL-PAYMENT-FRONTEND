// import NavbarPay from "@/components/organism/NavbarPay";
// import { getToken } from "@/services/auth";
// import { getPayment } from "@/services/paymentService";
// import { getUserById, me } from "@/services/userService";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import PaymentDetailModal from "../PaymentDetailModal";
// import { Inter } from "next/font/google";
// import Link from "next/link";
// import { MoveLeft } from "lucide-react";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// const HistoryPaymentPage = () => {
//   const router = useRouter();
//   const [payments, setPayments] = useState([]);
//   const [user, setUser] = useState(null);
//   const token = getToken();
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       const data = await getPayment();
//       setPayments(data);
//     };

//     const fetchUsers = async () => {
//       const res = await me(token);
//       setUser(res.data);
//     };

//     fetchUsers();
//     fetchPayments();
//   }, []);

//   const handleRowClick = (payment) => {
//     setSelectedPayment(payment);
//     setIsModalOpen(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/payind");
//   };

//   return (
//     <>
//       <div className={`${inter.variable} font-sans bg-gray-100 min-h-screen`}>
//         <div className="container mx-auto py-8">
//           <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
//             <div className="col-span-4 sm:col-span-3">
//               <div className="bg-white shadow rounded-lg p-6">
//                 <div className="flex flex-col items-center">
//                   <img
//                     src={
//                       user?.profilePicture ||
//                       "https://cdn-icons-png.flaticon.com/512/4322/4322991.png"
//                     }
//                     className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
//                   ></img>
//                   <h1 className="text-xl font-bold">{user?.name}</h1>
//                   <p className="text-gray-700">{user?.role}</p>
//                   <div className="mt-6 flex flex-wrap gap-4 justify-center">
//                     <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//                 <hr className="my-6 border-t border-gray-300" />
//                 <div className="flex flex-col">
//                   <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
//                     About
//                   </span>
//                   <ul>
//                     <li className="mb-2">NIS : {user?.nis}</li>
//                     <li className="mb-2">Email : {user?.email}</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="col-span-4 sm:col-span-9">
//               <div className="bg-white shadow rounded-lg p-6">
//                 <Link href="/payment" className="text-blue-600 underline">
//                   Back
//                 </Link>
//                 <h2 className="flex text-xl font-bold my-3">Payment History</h2>
//                 <table class="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
//                   <thead>
//                     <tr class="bg-gray-100 border-b">
//                       <th class="px-4 py-2 text-left">Payment ID</th>
//                       <th class="px-4 py-2 text-left">Payment Name</th>
//                       <th class="px-4 py-2 text-left">Payment Type</th>
//                       <th class="px-4 py-2 text-left">Amount</th>
//                       <th class="px-4 py-2 text-left">Payment Status</th>
//                       <th class="px-4 py-2 text-left">Description</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payments.length > 0 ? (
//                       payments.map((payment) => (
//                         <tr
//                           key={payment.id}
//                           className="border-b hover:bg-gray-50 text-sm"
//                           onClick={() => handleRowClick(payment)}
//                         >
//                           <td className="px-4 py-2">{payment.paymentId}</td>
//                           <td className="px-4 py-2">{payment.paymentName}</td>
//                           <td className="px-4 py-2">{payment.paymentTypeId}</td>
//                           <td className="px-4 py-2">{payment.amount}</td>
//                           <td
//                             className={`px-4 py-2 ${
//                               payment.paymentStatus === "PENDING"
//                                 ? "text-red-500"
//                                 : "text-green-500"
//                             }`}
//                           >
//                             {payment.paymentStatus}
//                           </td>
//                           <td className="px-4 py-2">{payment.description}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="6"
//                           className="px-4 py-2 text-center text-gray-500"
//                         >
//                           No pending payments found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Payment Detail Modal */}
//       {isModalOpen && (
//         <PaymentDetailModal
//           payment={selectedPayment}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default HistoryPaymentPage;
