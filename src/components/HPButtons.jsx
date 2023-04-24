import React from "react";
import { Link } from "react-router-dom";

function HPButtons() {
  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="flex space-y-3 md:text-xl font-semibold ">
        <Link
          to="/post"
          className="bg-buttons font-outfit text-white font-light py-3 px-24 md:px-32 rounded-3xl"
        >
          post an item
        </Link>
      </div>
    </div>
  );
}

export default HPButtons;
