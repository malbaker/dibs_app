import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false); // state to track whether the modal should be shown

  const handleClaimItem = async () => {
    // handle claim item logic
    setShowModal(false); // hide the modal after claim item is successful
  };

  return (
    <>
      <div
        className="card card-compact w-96 bg-base-100 shadow-xl text-dm-blue cursor-pointer"
        style={{ margin: "20px" }}
        onClick={() => setShowModal(true)} // show the modal when the card is clicked
      >
        <figure>
          <img
            src={post.image}
            alt={post.description}
            style={{ maxHeight: "40vh", width: "100vh" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.category}</h2>
          <p className="card-actions justify-beginning">{post.address}</p>
          <div className="card-actions justify-end">
            <label
              htmlFor={`modal-${post.id}`}
              className="btn mt-1 lowercase text-dm-blue bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0"
            >
              more info
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id={`modal-${post.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={`modal-${post.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{post.description}</h3>
          <button
            onClick={() => claimItem(post)}
            className="btn mt-1 lowercase text-dm-blue bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0"
          >
            claim item
          </button>
        </div>
      </div>
    </>
  );
}

Cards.propTypes = {
  data: PropTypes.array,
};

Card.propTypes = {
  post: PropTypes.object,
};

export default Cards;