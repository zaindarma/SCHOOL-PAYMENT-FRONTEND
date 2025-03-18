import Icons from "@/components/atoms/Icons";
import React from "react";
import "flowbite";
import { useRouter } from "next/router";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const path = router.asPath.split("/").filter(Boolean).pop().toUpperCase();
  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Icons.SidebarButton />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center justify-center p-2 text-gray-900  dark:text-white font-bold">
                <p className="ms-3">{path}</p>
              </div>
            </li>
            <li>
              <a
                onClick={() => router.push("/admin/dashboard")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:cursor-pointer"
              >
                <Icons.Chart />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                onClick={() => router.push("/admin/users")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons.AccountBox />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => router.push("/admin/student")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons.Badge />
                <span className="flex-1 ms-3 whitespace-nowrap">Student</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => router.push("/admin/payment")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons.Wallet />
                <span className="flex-1 ms-3 whitespace-nowrap">Payment</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => router.push("/admin/classes")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons.School />
                <span className="flex-1 ms-3 whitespace-nowrap">Classes</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => router.push("/admin/school-year")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icons.PhotoMerge />
                <span className="flex-1 ms-3 whitespace-nowrap">School year</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p2 sm:p4 rounded-lg dark:border-gray-700">{children}</div>
      </div>
    </>
  );
};

export default Dashboard;
