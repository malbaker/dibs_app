import React from "react";
import { Link } from "react-router-dom";

function ClaimButton() {
  return (
    <Link
      to="/claim"
      className="bg-buttons hover:bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full"
    >
      Claim
    </Link>
  );
}

export default ClaimButton;
