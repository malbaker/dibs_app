import React from "react";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";

function HPNavButtons() {
  return (
    <div className="flex justify-center space-x-6">
      <Link
        to="/contact"
        className="bg-buttons text-white font-medium py-3 px-6 rounded-full flex items-center"
      >
        <CiMail className="mr-2" />
      </Link>
      <Link
        to="/faq"
        className="bg-buttons text-white font-outfit font-thin py-3 px-8 rounded-3xl"
      >
        help / faqs
      </Link>
    </div>
  );
}

export default HPNavButtons;
