import React from "react";
import clsx from "clsx";
import { Link, To } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  className?: string;
  to: To;
};

const StyledLink = ({ to, children, className }: Props) => {
  return (
    <Link
      to={to}
      className={clsx(
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
        className,
      )}
    >
      {children && children}
    </Link>
  );
};

export default StyledLink;
