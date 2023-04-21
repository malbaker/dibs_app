import React from "react";
import { Link } from "react-router-dom";

function HPButtons() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-3 text-xl font-semibold">
        <Link
          to="/post"
          className="bg-buttons font-outfit text-white font-light py-3 px-32 rounded-3xl"
        >
          post an item
        </Link>
      </div>
    </div>
  );
}

export default HPButtons;
