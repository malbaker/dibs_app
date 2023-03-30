import React from "react";
import couchImg from "/images/couch.png";

function Carousel() {
  return (
    <div
      className="carousel carousel-center max-w-md p-4 bg-carousel rounded-box"
      style={{ height: "150px" }}
    >
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
      <div className="carousel-item" style={{ margin: "0 5px" }}>
        <img src={couchImg} className="rounded-box" alt="" />
      </div>
    </div>
  );
}

export default Carousel;
