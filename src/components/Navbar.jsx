/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { BiUserCircle } from "react-icons/bi";

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
          className="btn text-dm-blue btn-ghost normal-case text-3xl font-outfit font-thin hover:bg-lm-blue hover:text-buttons"
          href="/"
        >
          dibs!
        </a>
      </div>
      <div className="navbar-end flex">
        <div className="ml-auto">
          <button className="btn bg-transparent border-0">
            {" "}
            <a className="text-black text-xl" href="/">
              <BiUserCircle />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
