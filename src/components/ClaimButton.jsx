import React, { useState } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";

function ClaimButton({ post }) {
  const [isClaimed, setIsClaimed] = useState(post.claimed);

  const handleClaim = async () => {
    setIsClaimed(true);
    const docRef = doc(db, "posts", post.id);
    await updateDoc(docRef, { claimed: false }); //temporary solution until we figure out what to do with this
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
