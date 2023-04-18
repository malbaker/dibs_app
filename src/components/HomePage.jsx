import React from "react";
import HPButtons from "./HPButtons";
import mapImg from "/images/map.png";
import Carousel from "./Carousel";
import ClaimedCarousel from "./ClaimedCarousel";
import HPNavButtons from "./HPNavButtons";

function HomePage() {
  return (
    <div className="hero-content text-center">
      <div className="max-w-md max-h-screen">
        <div
          className="scrollable-container"
          style={{ height: "100vh", overflowY: "auto", marginTop: "60px" }}
        >
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
          <div className="mt-6 flex items-center justify-between -mb-1">
            <div>
              <p className="text-left font-outfit font-light mb-1">
                Recently claimed items
              </p>
            </div>
            <div>
              <a href="/claimed">
                <button className="text-outfit font-thin text-md bg-transparent py-2 px-4 rounded-lg">
                  more
                </button>
              </a>
            </div>
          </div>
          <div>
            <ClaimedCarousel />
          </div>
          <div className="py-5">
            <HPNavButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
