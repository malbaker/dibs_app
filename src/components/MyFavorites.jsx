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
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FavoritedCards from "./FavoritedCards";

function MyFavorites() {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [user] = useAuthState(auth);

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
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFavorites();

      const unsubscribe = onSnapshot(doc(db, "users", user.uid), () => {
        fetchFavorites();
      });

      return () => unsubscribe();
    }
  }, [user, fetchFavorites]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6">My Favorites</h1>
      {favoritePosts.length === 0 ? (
        <p className="text-lg font-bold text-center">
          You have no favorited posts yet!
        </p>
      ) : (
        <>
          <h1 className="ml-6 mt-12 text-3xl font-light mb-6">My Favorites</h1>
          <FavoritedCards data={favoritePosts} />
        </>
      )}
    </div>
  );
}

export default MyFavorites;
