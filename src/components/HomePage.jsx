import React from "react";
import HPButtons from "./HPButtons";
import mapImg from "/images/map.png";
import Carousel from "./Carousel";

function HomePage() {
  return (
    <div className="-mt-0 hero-content text-center">
      <div className="max-w-md max-h-screen">
        <HPButtons />
        <div className="mt-6">
          <div className="flex flex-col items-start">
            <p className="text-left font-outfit font-light mb-1">
              Explore items nearby..
            </p>
            <img
              src={mapImg}
              alt=""
              className="rounded-3xl"
              style={{ maxWidth: "100%", width: "100%" }}
            />
          </div>
        </div>
        <div className="mt-6 ">
          <p className="text-left font-outfit font-light mb-1">Newest items..</p>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
