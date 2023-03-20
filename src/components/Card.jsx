/* eslint-disable react/prop-types */
import React from "react";

const Card = ({ imageSrc, itemType, itemAddress, itemDescription }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt="Item" />
      <div className="card-body">
        <h5 className="card-title">{itemType}</h5>
        <p className="card-text">{itemAddress}</p>
        <p className="card-text">{itemDescription}</p>
        <button className="btn btn-primary">Claim</button>
      </div>
    </div>
  );
};

export default Card;
