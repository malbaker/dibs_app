import React from 'react';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit"></link>




const Sidebar = () => {
    return (
      <div class="drawer-side font-outfit">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-screen text-5xl bg-dm-blue text-lm-blue">
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
  
          <li>
          <a class="text-lm-blue active:bg-dm-blue active:text-buttons" href="/post">post</a>
        </li>
        <li>
          <a class="text-lm-blue active:bg-dm-blue active:text-buttons" href="/view">view</a>
        </li>
        <li>
          <a class="text-lm-blue active:bg-dm-blue active:text-buttons" href="#">faqs</a>
        </li>

        <li class="text-buttons mt-96">
          <a class=" active:bg-dm-blue active:text-lm-blue" href="#">contact</a>
        </li>

        </ul>

      </div>
    );
  };
  
  export default Sidebar;