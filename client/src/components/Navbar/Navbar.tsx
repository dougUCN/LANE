import React from "react";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import darkModeLogo from "/logo/lane-dark-no-bg-B.png";
import lightModeLogo from "/logo/lane-light-no-bg.png";
import StyledLink from "./StyledLink";
import useDarkMode from "../../hooks/useDarkMode/useDarkMode";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isDark] = useDarkMode();
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
          "py-1",
          "dark:bg-dark-blue",
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
              <img
                src={isDark ? darkModeLogo : lightModeLogo}
                alt="Logo"
                className="object-cover relative h-16 ml-auto"
              />
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
                className="text-dark-blue dark:text-white"
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
