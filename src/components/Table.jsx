import React from "react";
import PropTypes from "prop-types";
import InputButton from "./InputButton";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { storage } from "../config/firebase";
import { ref, deleteObject } from "firebase/storage";

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

function Table({ data }) {
  return (
    <div className="max-w-fit">
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Image</th>
            <th>Item Type</th>
            <th>Item Location</th>
            <th>Condition</th>
            <th>Description</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <th />
              <td>
                {post.image != null ? (
                  <img src={post.image} alt={post.description} />
                ) : (
                  "No image."
                )}
              </td>
              <td>{post.category}</td>
              <td>{post.address}</td>
              <td>{post.condition}</td>
              <td>{post.description}</td>
              <td>
                <InputButton
                  onClick={() => claimItem(post)}
                  label={"Claim item"}
                  isActive={true}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
