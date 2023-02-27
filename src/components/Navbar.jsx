import React from 'react';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit"></link>

const Navbar = () => {
    return (
      <div class="navbar font-outfit">
        <div class="navbar-start">
          <label for="my-drawer" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-3xl hover:bg-lm-blue hover:text-buttons" href="/">dibs.</a>
        </div>
        <div class="navbar-end"></div>
      </div>
    );
  };
  
  export default Navbar;



