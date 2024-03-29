import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileCards from "./ProfileCards";

function MyFavorites() {
  const [loading, setLoading] = useState(false);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [user] = useAuthState(auth);
  const history = useNavigate();

  const fetchFavorites = useCallback(async () => {
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
        const userFavorites = userDoc.data().myFavorites;

        const favorites = [];
        for (const postId of userFavorites) {
          const postDoc = await getDoc(doc(db, "posts", postId));
          if (postDoc.exists) {
            favorites.push({ id: postDoc.id, ...postDoc.data() });
          }
        }
        setFavoritePosts(favorites);
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchFavorites();

      const unsubscribe = onSnapshot(doc(db, "users", user.uid), () => {
        fetchFavorites();
      });

      return () => unsubscribe();
    }
  }, [user, fetchFavorites]);

  return (
    <div className="container mx-auto p-1">
      {loading ? (
        <p className="text-lg font-bold text-center text-dm-blue">Loading...</p>
      ) : (
        <>
          {favoritePosts.length === 0 ? (
            <p className="text-lg font-bold text-center text-dm-blue">
              You have no favorited posts yet!
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between pt-24 px-4 md:px-24 lg:px-32">
                <h1 className="text-3xl font-light text-dm-blue">My Favorites</h1>
                <button
                  className="rounded-full bg-buttons text-white p-2 flex justify-center items-center max-w-xs"
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <ProfileCards data={favoritePosts} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyFavorites;
