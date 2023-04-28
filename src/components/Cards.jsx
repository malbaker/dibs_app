import React from "react";
import LikeButton from "./LikeButton";
import PropTypes from "prop-types";
import ClaimButton from "./ClaimButton";

function Cards({ data }) {
  return (
    <div className="w-fit mt-2 flex flex-col mx-auto md:grid md:gap-x-8 md:grid-cols-2 md:items-center lg:grid-cols-3">
      {data.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

function Card({ post }) {
  return (
    <>
      <div
        id={post.id}
        className="card card-compact bg-base-100 shadow-xl text-dm-blue max-w-xs w-full mx-auto my-3"
      >
        <figure>
          <img
            className=" w-full h-80 object-cover rounded"
            src={post.image}
            alt={
              post.additionalNotes && post.additionalNotes !== ""
                ? post.additionalNotes
                : "This post has no additional notes."
            }
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.address}</h2>
          <div className="flex content-between justify-center space-x-5 mx-auto">
            <button className="btn rounded-3xl text-xs px-2 py-1 gap-2 lowercase text-white bg-buttons border-buttons">
              {post.category}
            </button>
            <button className="btn rounded-3xl text-xs px-4 py-1 gap-2 lowercase text-gray-700 bg-transparent border-gray-700">
              {post.condition}
            </button>
            {post.color && post.color !== "" ? (
              <button
                className={
                  post.color === "white" || post.color === "yellow"
                    ? "btn rounded-3xl text-xs px-4 py-1 gap-2 lowercase text-dm-blue bg-transparent border-dm-blue"
                    : "btn rounded-3xl text-xs px-4 py-1 gap-2 lowercase text-white bg-transparent border-transparent"
                }
                style={{ backgroundColor: post.color }}
              >
                {post.color}
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="card-actions space-x-5 pt-2 align-middle justify-end">
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
    </>
  );
}

Card.propTypes = {
  post: PropTypes.object,
};
Cards.propTypes = {
  data: PropTypes.array,
};

export default Cards;
