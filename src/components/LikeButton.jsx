import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="heart-button flex flex-col items-center" onClick={handleLike}>
      {liked ? (
        <AiFillHeart className="text-red-500 text-xl" />
      ) : (
        <AiOutlineHeart className="text-xl" />
      )}
      <span className="mt-1 text-lg">{likesCount}</span>
    </div>
  );
};

export default LikeButton;
