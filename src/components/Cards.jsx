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
        <h2 className="card-title">{post.category}</h2>
        <p className="card-actions justify-beginning">
          {post.address.formatted_address
            ? post.address.formatted_address
            : post.address}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => claimItem(post)}
            className="btn mt-1 text-dm-blue bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0"
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
