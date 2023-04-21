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
  GeoPoint,
} from "firebase/firestore";
import getAddress, { geocodeAddress, getDistance } from "./Location";
import PropTypes from "prop-types";
import { SlReload } from "react-icons/sl";

function ClaimButton({ post }) {
  const [user] = useAuthState(auth);
  const [isClaimed, setIsClaimed] = useState(post.claimed);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);

  const handleClaim = async () => {
    setLoading(true);

    getAddress().then((address) => {
      const userlat = address.lat;
      const userlng = address.lng;
      console.log("user location", userlat, userlng);
      if (!post.coords) {
        geocodeAddress(post.address, (lat, lng) => {
          //console.log(lat, lng);
          const postlat = parseFloat(lat);
          const postlng = parseFloat(lng);
          console.log("post location", postlat, postlng);
          console.log(postlat - userlat, postlng - userlng);
          getDistance(userlat, userlng, postlat, postlng).then((d) => {
            setDistance(d);
          });
        });
      } else {
        console.log(post.coords.latitude - userlat, post.coords.longitude - userlng);
        console.log("post location", post.coords.latitude, post.coords.longitude);
        getDistance(
          userlat,
          userlng,
          post.coords.latitude,
          post.coords.longitude,
        ).then((d) => {
          setDistance(d);
        });
      }
      console.log(distance);
      if (distance > 100) {
        console.log("got here");
        alert("You are too far away to claim this item.");
        setLoading(false);
        return;
      } else {
        console.log("within 100 meters");
        /* const postRef = doc(db, "posts", post.id);
        setIsClaimed(true);
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
        }); */
        setLoading(false);
      }
    });
  };

  return (
    <button
      onClick={!isClaimed ? handleClaim : undefined}
      className={`${
        isClaimed ? "bg-gray-400 cursor-default" : "bg-buttons hover:bg-buttons"
      } text-white font-bold font-outfit py-2 px-10 rounded-full my-auto`}
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
