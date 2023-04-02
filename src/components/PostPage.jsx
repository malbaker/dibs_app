import React from "react";
import InputForm from "./InputForm";

function PostPage() {
  return (
    <div className="hero-content text-center sticky top-0 w-full">
      <div className="max-w-md mx-auto pt-20">
        <h1 className="text-4xl text-fonts font-normal mb-12 -mt-28">
          post an item
        </h1>
        <InputForm />
      </div>
    </div>
  );
}

export default PostPage;
