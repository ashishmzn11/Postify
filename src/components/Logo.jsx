import React from "react";

function Logo({ width = "100px" }) {
  return (
    <img
      src="/logo.png"   // <-- यहां अपनी logo image path डालें
      alt="Logo"
      className="img-fluid d-inline-block align-text-top"
      style={{ width }}
    />
  );
}

export default Logo;
