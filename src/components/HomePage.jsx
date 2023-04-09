import React from "react";
import HPButtons from "./HPButtons";
import mapImg from "/images/map.png";
import Carousel from "./Carousel";

function HomePage() {
  return (
    <div className="-mt-24 hero-content text-center">
      <div className="max-w-md max-h-screen">
        <HPButtons />
        <div className="mt-6">
          <div className="flex flex-col items-start">
            <p className="text-left font-outfit font-light mb-1">
              Explore items nearby
            </p>
            <img
              src={mapImg}
              alt=""
              className="rounded-3xl"
              style={{ maxWidth: "100%", width: "100%", maxHeight: "150px" }}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between -mb-1">
          <div>
            <p className="text-left font-outfit font-light mb-1">Newest items</p>
          </div>
          <div>
            <a href="/view">
              <button className="text-outfit font-thin text-md bg-transparent py-2 px-4 rounded-lg">
                more
              </button>
            </a>
          </div>
        </div>
        <div>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
