import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxArrowInUp, BsFillBagCheckFill } from "react-icons/bs";
import { SlLogout, SlLogin } from "react-icons/sl";
import { auth, googleSignIn, logout } from "../config/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function Profile() {
  const [user] = useAuthState(auth);
  const firstName = user?.displayName.split(" ")[0];

  return (
    <div className="h-screen flex justify-start items-center mr-48 ml-14 -mt-48">
      <div className="text-outfit text-buttons font-light text-left">
        {user ? (
          <>
            {/* 
              USER IS SIGNED IN
             */}
            <p className="text-5xl leading-tight">Hello,</p>
            <p className="text-5xl leading-tight">{firstName}!</p>
            <div className="mt-10">
              <div className="mb-4">
                <a
                  href={`/user/${user.uid}/myfavorites`}
                  className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg"
                >
                  <FaRegHeart size={24} className="mr-3" />
                  <span>my favorites</span>
                </a>
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
            <div className="mb-4">
              <button
                className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg"
                onClick={logout}
              >
                <SlLogout size={24} className="mr-3" />
                <span>logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/*
              NOT SIGNED IN
            */}
            <p className="text-5xl leading-tight">Hello,</p>
            <p className="text-3xl leading-tight">
              You&apos;re not currently signed in.
            </p>
            <p className="text-xl leading-tight">
              By signing in, you can make your dibs experience more personalized.
            </p>
            <div className="mt-10">
              <div className="mb-4">
                <button
                  className="text-outfit font-thin text-3xl whitespace-nowrap flex items-center space-x-2 bg-transparent text-buttons py-2 px-4 rounded-lg"
                  onClick={googleSignIn}
                >
                  <SlLogin size={24} className="mr-3" />
                  <span>sign in with google</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
