import React from "react";

function Navbar() {
  return (
    <div className="navbar font-outfit fixed bg-lm-blue z-30">
      <div className="navbar-start">
        <label htmlFor="my-drawer" className="btn btn-ghost text-dm-blue btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div className="navbar-center">
        <a
          className="btn text-dm-blue btn-ghost normal-case text-3xl hover:bg-lm-blue hover:text-buttons"
          href="/"
        >
          dibs!
        </a>
      </div>
      <div className="navbar-end" />
    </div>
  );
}

export default Navbar;
