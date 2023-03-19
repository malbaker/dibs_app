import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar";
import PostPage from "../components/PostPage";
import Sidebar from "../components/Sidebar";
import "../index.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="drawer h-screen bg-lm-blue font-outfit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <div className="hero min-h-screen">
          <PostPage />
        </div>
      </div>
      <Sidebar />
    </div>
  </React.StrictMode>,
  document.getElementById("root"),
);
