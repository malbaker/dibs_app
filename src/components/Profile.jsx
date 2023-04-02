/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxArrowInUp, BsFillBagCheckFill } from "react-icons/bs";

function Profile() {
  return (
    <div className="h-screen flex justify-start items-center mr-48 ml-14 -mt-48">
      <div className="text-outfit text-buttons font-light text-left">
        <p className="text-5xl leading-tight">Hello,</p>
        <p className="text-5xl leading-tight">User!</p>
        <div className="mt-10">
          <div className="mb-4">
            <button className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg">
              <FaRegHeart size={24} className="mr-3" />
              <span>my favorites</span>
            </button>
          </div>
          <div className="mb-4">
            <button className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg">
              <BsBoxArrowInUp size={24} className="mr-3" />
              <span>uploaded items</span>
            </button>
          </div>
          <div className="mb-4">
            <button className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg">
              <BsFillBagCheckFill size={24} className="mr-3" />
              <span>my claimed items</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
