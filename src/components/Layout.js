import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-8">{children}</div>
    </div>
  );
};

export default Layout;
