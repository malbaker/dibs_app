import React from "react";
import { Link } from "react-router-dom";

function HPButtons() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-3 text-xl font-semibold ">
        <Link
          to="/post"
          className="bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full pt-3 pb-3"
        >
          post item
        </Link>

        <Link
          to="/view"
          className="bg-buttons border-dm-blue focus:border-transparent text-dm-blue font-outfit py-2 px-10 rounded-full pt-3 pb-3"
        >
          view items
        </Link>
      </div>
    </div>
  );
}

export default HPButtons;
