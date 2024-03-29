import React from "react";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit"></link>;

const Sidebar = () => {
  return (
    <div className="drawer-side font-outfit">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-screen text-5xl bg-dm-blue text-lm-blue">
        <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
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

        <li>
          <a
            href="/post"
            className="text-lm-blue active:bg-dm-blue active:text-buttons"
          >
            post
          </a>
        </li>
        <li>
          <a
            href="/view"
            className="text-lm-blue active:bg-dm-blue active:text-buttons"
          >
            view
          </a>
        </li>
        <li>
          <a href="/" className="text-lm-blue active:bg-dm-blue active:text-buttons">
            faqs
          </a>
        </li>

        <li className="text-buttons mt-96">
          <a href="/" className=" active:bg-dm-blue active:text-lm-blue">
            contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
