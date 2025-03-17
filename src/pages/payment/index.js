import NavbarPay from "@/components/organism/NavbarPay";
import React from "react";

const PaymentPage = () => {
  return (
    <>
      <NavbarPay />
      <div className="bg-gray-100 pt-24">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">John Doe</h1>
                  <p className="text-gray-700">2024/2025</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Edit Profile
                    </a>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    About
                  </span>
                  <ul>
                    <li className="mb-2">NIS : 12345678</li>
                    <li className="mb-2">Class : Grade 10 - A</li>
                    <li className="mb-2">Address : 123 Main St, City A</li>
                    <li className="mb-2">Birthdate : 2002-07-09</li>
                    <li className="mb-2">Number : 085216354126</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">School Bill</h2>
                <table class="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                  <thead>
                    <tr class="bg-gray-100 border-b">
                      <th class="px-4 py-2 text-left">Payment ID</th>
                      <th class="px-4 py-2 text-left">Payment Name</th>
                      <th class="px-4 py-2 text-left">Payment Type</th>
                      <th class="px-4 py-2 text-left">Amount</th>
                      <th class="px-4 py-2 text-left">Payment Status</th>
                      <th class="px-4 py-2 text-left">Description</th>
                      <th class="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b hover:bg-gray-50">
                      <td class="px-4 py-2">12345</td>
                      <td class="px-4 py-2">Tuition Payment - Alice</td>
                      <td class="px-4 py-2">Tuition Fee</td>
                      <td class="px-4 py-2">$100.00</td>
                      <td class="px-4 py-2 text-green-600">Completed</td>
                      <td class="px-4 py-2">Tuition for semester 1</td>
                      <td class="px-4 py-2">
                        <button className="bg-red-50 rounded-lg p-4 hover:bg-red-200">
                          Pay
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
