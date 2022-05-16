import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { useBreakpoint } from "../hooks/tailwind";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/ems" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              LAME
            </span>
          </Link>
          <div className="block w-auto">
            <ul className="flex flex-row space-x-8 mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to="/ems"
                  className="text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  EMS
                </Link>
              </li>
              <li>
                <Link
                  to="/run-scheduler"
                  className="text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700"
                >
                  Run Scheduler
                </Link>
              </li>
              <li>
                <Link
                  to="/control-panel"
                  className="text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700"
                >
                  Control Panel
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
