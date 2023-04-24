/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
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
import PropTypes from "prop-types";

function ClaimButton({ post }) {
  const [user] = useAuthState(auth);
  const [isClaimed, setIsClaimed] = useState(post.claimed);

  const handleClaim = async () => {
    setIsClaimed(true);
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, { claimed: true });
    post["status"] = "claimed";

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const users = await getDocs(q);
    users.forEach((dbuser) => {
      const userRef = doc(db, "users", dbuser.id);
      (async () => {
        await updateDoc(userRef, {
          myClaims: arrayUnion(post.id),
        });
      })();
      console.log(`Updated user ${userRef.id} with claimed post ${post.id}!`);
    });
  };

  return (
    <button
      onClick={!isClaimed ? handleClaim : undefined}
      className={`${
        isClaimed ? "bg-gray-400" : "bg-orange hover:bg-orange"
      } text-white font-bold font-outfit py-2 px-10 rounded-full ${
        isClaimed ? "cursor-default" : ""
      }`}
      disabled={isClaimed}
    >
      {isClaimed ? "claimed" : "claim"}
    </button>
  );
}

ClaimButton.propTypes = {
  post: PropTypes.object,
};

export default ClaimButton;
