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

function MyPosts() {
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [user] = useAuthState(auth);
  const history = useNavigate();

  const fetchPosts = useCallback(async () => {
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
        const userPosts = userDoc.data().myPosts;

        const Posts = [];
        for (const postId of userPosts) {
          const postDoc = await getDoc(doc(db, "posts", postId));
          if (postDoc.exists) {
            Posts.push({ id: postDoc.id, ...postDoc.data() });
          }
        }
        setUserPosts(Posts);
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchPosts();

      const unsubscribe = onSnapshot(doc(db, "users", user.uid), () => {
        fetchPosts();
      });

      return () => unsubscribe();
    }
  }, [user, fetchPosts]);

  return (
    <div className="container mx-auto p-1">
      {loading ? (
        <p className="text-lg font-bold text-center text-dm-blue">Loading...</p>
      ) : (
        <>
          {userPosts.length === 0 ? (
            <p className="text-lg font-bold text-center text-dm-blue">
              You have not made any posts yet!
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between pt-24 px-4 md:px-24 lg:px-32">
                <h1 className="text-3xl font-light text-dm-blue">My Posts</h1>
                <button
                  className="rounded-full bg-buttons text-white p-2 flex justify-center items-center w-12"
                  onClick={() => {
                    history(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <ProfileCards data={userPosts} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyPosts;
