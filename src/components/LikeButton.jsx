import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import PropTypes from "prop-types";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
  collection,
  where,
  getDoc,
  limit,
} from "firebase/firestore";

const LikeButton = ({ post }) => {
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  (async () => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid), limit(1));
    const users = await getDocs(q);

    const userRef = doc(db, "users", users.docs[0].id);
    setLiked((await getDoc(userRef)).data().myFavorites.includes(post.id));
  })();

  const handleLike = async () => {
    const postRef = doc(db, "posts", post.id);
    liked
      ? await updateDoc(postRef, { likes: post.likes - 1 })
      : await updateDoc(postRef, { likes: post.likes + 1 });

    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    const q = query(collection(db, "users"), where("uid", "==", user.uid), limit(1));
    const users = await getDocs(q);

    const userRef = doc(db, "users", users.docs[0].id);
    await updateDoc(userRef, {
      myFavorites: liked ? arrayRemove(post.id) : arrayUnion(post.id),
    });
    setLiked(!liked);
  };

  return (
    <div className="heart-button flex flex-col items-center" onClick={handleLike}>
      {liked ? (
        <AiFillHeart className="text-red-500 text-xl" />
      ) : (
        <AiOutlineHeart className="text-xl" />
      )}
      <span className="mt-1 text-lg">{`${likesCount}`}</span>
    </div>
  );
};

LikeButton.propTypes = {
  post: PropTypes.object,
};
export default LikeButton;
