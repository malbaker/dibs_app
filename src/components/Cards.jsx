import React from "react";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import LikeButton from "./LikeButton";

import PropTypes from "prop-types";

function Cards({ data }) {
  return (
    <div className="max-w-fit">
      {data.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

async function claimItem(post) {
  const docRef = doc(db, "posts", post.id);

  await updateDoc(docRef, {
    claimed: true,
  });
  window.location.reload();
}

function Card({ post }) {
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
          <div className="card-actions justify-end">
            <div className="flex items-center mr-4 -mt-20">
              <LikeButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cards.propTypes = {
  data: PropTypes.array,
};

Card.propTypes = {
  post: PropTypes.object,
};

export default Cards;
