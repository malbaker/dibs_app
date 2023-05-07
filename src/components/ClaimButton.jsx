import React, { useState, useEffect, useCallback } from "react";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import getAddress, { getDistance } from "./Location";
import PropTypes from "prop-types";
import { SlReload } from "react-icons/sl";

function ClaimButton({ post }) {
  const [user] = useAuthState(auth);
  const [isClaimed, setIsClaimed] = useState(post.claimed);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(null);

  const distanceCheck = useCallback(() => {
    if (distance > 90) {
      console.log("outside 300 feet. distance in useeffect", distance);
      alert("You are too far away to claim this item. Must be within 300 feet.");
      setLoading(false);
      return;
    } else {
      console.log("within 300 feet. distance in useeffect", distance);
      (async () => {
        const postRef = doc(db, "posts", post.id);
        setIsClaimed(true);
        await updateDoc(postRef, { claimed: true });
        post["status"] = "claimed";

        if (user) {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const users = await getDocs(q);

          const userRef = doc(db, "users", users.docs[0].id);
          await updateDoc(userRef, {
            myClaims: arrayUnion(post.id),
          });
          console.log(`Updated user ${userRef.id} with claimed post ${post.id}!`);
        }
      })();
      setLoading(false);
    }
  }, [distance, post, user]);

  useEffect(() => {
    console.log("distance updated");
    if (distance) {
      console.log("distance is 0");
      distanceCheck();
    }
  }, [distance, distanceCheck]);

  const handleClaim = async () => {
    setLoading(true);

    getAddress().then((address) => {
      const userlat = address.lat;
      const userlng = address.lng;
      const postlat = parseFloat(post.coords.latitude);
      const postlng = parseFloat(post.coords.longitude);

      getDistance(userlat, userlng, postlat, postlng).then((d) => {
        setDistance(d);
      });
    });
  };

  return (
    <button
      onClick={!isClaimed ? handleClaim : undefined}
      className={`${
        isClaimed ? "bg-gray-400" : "bg-orange hover:bg-orange"
      } text-white font-bold font-outfit py-2 px-10 rounded-full my-auto ${
        isClaimed ? "cursor-default" : ""
      }`}
      disabled={isClaimed || loading}
    >
      {loading ? (
        <div className="flex flex-row">
          <SlReload className="animate-spin-reverse my-auto mx-2" />
          loading...
        </div>
      ) : isClaimed ? (
        "claimed"
      ) : (
        "claim"
      )}
    </button>
  );
}

ClaimButton.propTypes = {
  post: PropTypes.object,
};

export default ClaimButton;
