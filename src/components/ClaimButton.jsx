import React, { useState } from "react";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import PropTypes from "prop-types";

function ClaimButton({ post }) {
  const [user] = useAuthState(auth);
  const [isClaimed, setIsClaimed] = useState(post.claimed);

  const handleClaim = async () => {
    setIsClaimed(true);
    const docRef = doc(db, "posts", post.id);
    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      myFavorites: arrayUnion(post.id),
    });
    await updateDoc(docRef, { claimed: true }); //temporary solution until we figure out what to do with this
  };

  return (
    <button
      onClick={!isClaimed ? handleClaim : undefined}
      className={`${
        isClaimed ? "bg-gray-400" : "bg-buttons hover:bg-buttons"
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
