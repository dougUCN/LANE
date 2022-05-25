import React from "react";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import StyledLink from "./StyledLink";

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
              <FontAwesomeIcon
                className="text-gray-800 dark:text-white"
                icon={faBars}
              />
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
                <StyledLink to="/ems">EMS</StyledLink>
              </li>
              <li className="flex items-center">
                <StyledLink to="/run-scheduler">Run Scheduler</StyledLink>
              </li>
              <li className="flex items-center">
                <StyledLink to="/control-panel">Control Panel</StyledLink>
              </li>
              <li className="flex items-center">
                <StyledLink to="/login">Login</StyledLink>
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
