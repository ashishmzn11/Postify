import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary", // bootstrap variant: primary, secondary, danger, success, etc.
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}