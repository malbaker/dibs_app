import React from "react";
import { db } from "../config/firebase";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  where,
  getDocs,
  doc,
  limit,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import LikeButton from "./LikeButton";
import PropTypes from "prop-types";
import ClaimButton from "./ClaimButton";

function Cards({ data }) {
  return (
    <div className="max-w-fit">
      {data.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

function Card({ post }) {
  const [user] = useAuthState(auth);
  // call it like this ---> favoritePost(post.id);
  async function handleFavorite() {
    const q = query(collection(db, "users"), where("uid", "==", user.uid), limit(1));
    const users = await getDocs(q);

    const userRef = doc(db, "users", users.docs[0].id);
    (async () => {
      await updateDoc(userRef, {
        myFavorites: user.docs[0].data().myFavorites.includes(post.id)
          ? arrayRemove(post.id)
          : arrayUnion(post.id),
      });
    })();
    console.log(`Updated user ${userRef.id} with claimed post ${post.id}!`);
  }

  return (
    <div>
      <div
        className="card card-compact w-96 bg-base-100 shadow-xl text-dm-blue"
        style={{ margin: "20px" }}
      >
        <figure>
          <img
            src={post.image}
            alt={post.description}
            style={{ maxHeight: "40vh", width: "100vh" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.address}</h2>
          <div className="flex space-x-2 ">
            <button className="btn rounded-3xl text-xs px-2 py-1 gap-2 lowercase text-white bg-buttons border-buttons">
              {post.category}
            </button>
            <button
              className={`btn rounded-3xl text-xs px-2 py-1 gap-2 lowercase ${
                post.condition === "new"
                  ? "text-gray-300 bg-transparent border-gray-300"
                  : "text-gray-700 bg-transparent border-gray-700"
              }`}
            >
              {post.condition}
            </button>
            <button
              className="btn rounded-3xl text-xs px-2 py-1 gap-2 lowercase text-white bg-transparent border-transparent"
              style={{ backgroundColor: post.color }}
            >
              {post.color}
            </button>
            <div className="flex justify-start"></div>
          </div>
          <div className="card-actions space-x-5 justify-end">
            <LikeButton post={post} />
            <ClaimButton post={post} />
          </div>
        </div>
      </div>
      <input type="checkbox" id={`modal-${post.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`modal-${post.id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{post.description}</h3>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.object,
};
Cards.propTypes = {
  data: PropTypes.array,
};

export default Cards;
