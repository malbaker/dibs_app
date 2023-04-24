import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function RootLayout() {
  return (
    <>
      <div className="drawer h-screen bg-lm-blue font-outfit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          <div className="hero min-h-screen">
            <Outlet />
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default RootLayout;
