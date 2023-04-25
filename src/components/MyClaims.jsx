import React, { useEffect, useState, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  query,
  where,
  limit,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileCards from "./ProfileCards";

function MyClaims() {
  const [loading, setLoading] = useState(false);
  const [userClaims, setUserClaims] = useState([]);
  const [user] = useAuthState(auth);
  const history = useNavigate();

  const fetchClaims = useCallback(async () => {
    if (user) {
      const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid),
        limit(1),
      );
      const users = await getDocs(q);

      if (!users.empty) {
        const userRef = doc(db, "users", users.docs[0].id);
        const userDoc = await getDoc(userRef);
        const userClaims = userDoc.data().myClaims;

        const Claims = [];
        for (const postId of userClaims) {
          const postDoc = await getDoc(doc(db, "posts", postId));
          if (postDoc.exists) {
            Claims.push({ id: postDoc.id, ...postDoc.data() });
          }
        }
        setUserClaims(Claims);
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchClaims();

      const unsubscribe = onSnapshot(doc(db, "users", user.uid), () => {
        fetchClaims();
      });

      return () => unsubscribe();
    }
  }, [user, fetchClaims]);

  return (
    <div className="container mx-auto p-1">
      {loading ? (
        <p className="text-lg font-bold text-center text-dm-blue">Loading...</p>
      ) : (
        <>
          {userClaims.length === 0 ? (
            <p className="text-lg font-bold text-center text-dm-blue">
              You have no claimed posts yet!
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between pt-24 px-4 md:px-24 lg:px-32">
                <h1 className="text-3xl font-light text-dm-blue">
                  My Claimed Items
                </h1>
                <button
                  className="rounded-full bg-buttons text-white p-2 flex justify-center items-center w-12"
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <ProfileCards data={userClaims} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyClaims;
