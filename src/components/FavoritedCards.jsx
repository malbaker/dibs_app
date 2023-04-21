import React from "react";
import PropTypes from "prop-types";

function FavoritedCards({ data }) {
  return (
    <div className="w-fit mt-2 flex flex-col mx-auto md:grid md:gap-x-1 md:grid-cols-2 md:items-center lg:grid-cols-3">
      {data.map((post) => (
        <FavoritedCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function FavoritedCard({ post }) {
  return (
    <div>
      <div
        className="card card-compact bg-base-100 shadow-xl text-dm-blue w-72 mx-7 my-3"
        style={{ margin: "20px" }}
      >
        <figure>
          <img
            className="w-fit h-64 p-3 object-cover rounded"
            src={post.image}
            alt={post.description}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.address}</h2>
          <div className="flex space-x-2 ">
            <div className="flex justify-start"></div>
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

FavoritedCard.propTypes = {
  post: PropTypes.object,
};
FavoritedCards.propTypes = {
  data: PropTypes.array,
};

export default FavoritedCards;
