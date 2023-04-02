import React from "react";
import { db, storage } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
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
  await deleteDoc(docRef);

  if (post.image != null) {
    const storageRef = ref(storage, post.image);
    deleteObject(storageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }
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
          </div>
          <div className="card-actions justify-end">
            <label
              htmlFor={`modal-${post.id}`}
              className="btn mt-1 lowercase text-buttons bg-transparent hover:bg-buttons hover:text-white hover:border-transparent rounded-full border-buttons focus:border-transparent focus:ring-0 focus:text-white focus: border-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </label>
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

          <button
            onClick={() => claimItem(post)}
            className="btn mt-1 lowercase text-white bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0"
          >
            claim item
          </button>
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
