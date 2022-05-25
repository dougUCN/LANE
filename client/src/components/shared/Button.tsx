import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        "bg-gray-500",
        "active:bg-gray-600",
        "text-white",
        "font-bold",
        "uppercase",
        "text-xs",
        "rounded",
        "shadow",
        "hover:shadow-md",
        "outline-none",
        "focus:outline-none",
        "ease-linear",
        "transition-all",
        "duration-150",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
