import React from "react";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div>
      <nav
        className={clsx(
          "relative",
          "flex",
          "flex-wrap",
          "items-center",
          "justify-between",
          "bg-white",
          "shadow-lg",
          "px-2",
          "py-3",
          "dark:bg-gray-800",
        )}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            className={clsx(
              "w-full",
              "relative",
              "flex",
              "justify-between",
              "lg:w-auto",
              "lg:static",
              "lg:block",
              "lg:justify-start",
            )}
          >
            <Link to="/ems">
              <span
                className={clsx(
                  "text-gray-800",
                  "dark:text-white",
                  "text-xl",
                  "font-bold",
                  "leading-relaxed",
                  "inline-block",
                  "mr-4",
                  "py-2",
                  "whitespace-nowrap",
                  "uppercase",
                )}
              >
                LANE
              </span>
            </Link>
            <button
              className={clsx(
                "cursor-pointer",
                "text-xl",
                "leading-none",
                "px-3",
                "py-1",
                "border",
                "border-solid",
                "border-transparent",
                "rounded",
                "bg-transparent",
                "block",
                "lg:hidden",
                "outline-none",
                "focus:outline-none",
              )}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className={"text-gray-800 dark:text-white fas fa-bars"}></i>
            </button>
          </div>
          <div
            className={clsx(
              "lg:flex",
              "flex-grow",
              "items-center",
              "bg-white",
              "bg-transparent",
              "shadow-none",
              isOpen ? "block rounded shadow-lg" : "hidden",
            )}
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto last:lg:mr-0">
              <li className="flex items-center">
                <Link to="/ems" className={styles.navLink}>
                  EMS
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/run-scheduler" className={styles.navLink}>
                  Run Scheduler
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/control-panel" className={styles.navLink}>
                  Control Panel
                </Link>
              </li>
              <li className="flex items-center">
                <Link to="/login" className={styles.navLink}>
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

const styles = {
  navLink: clsx(
    "px-3",
    "py-2",
    "flex",
    "items-center",
    "leading-snug",
    "text-gray-700",
    "border-gray-100",
    "hover:bg-gray-50",
    "lg:hover:bg-transparent",
    "hover:text-blue-700",
    "dark:text-gray-400",
    "dark:hover:bg-gray-700",
    "dark:hover:text-white",
    "dark:hover:bg-transparent",
    "dark:border-gray-700",
  ),
};
