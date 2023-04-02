import React from "react";
import InputForm from "./InputForm";

function PostPage() {
  return (
    <div className="hero-content text-center sticky top-0 w-full">
      <div className="max-w-md mx-auto pt-20">
        {/*
        <h1 className="text-4xl text-outfit font-thin mb-12 -mt-32">post an item</h1>{" "}
  */}
        <div className="-mt-12">
          <InputForm />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
