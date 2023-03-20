import React from "react";
import Card from "./Card";

const items = [
  {
    id: 1,
    imageSrc: "https://via.placeholder.com/150",
    itemType: "Item Type 1",
    itemAddress: "123 Main St, Anytown, USA",
    itemDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    imageSrc: "https://via.placeholder.com/150",
    itemType: "Item Type 2",
    itemAddress: "456 Elm St, Anycity, USA",
    itemDescription:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    imageSrc: "https://via.placeholder.com/150",
    itemType: "Item Type 3",
    itemAddress: "789 Oak St, Anyvillage, USA",
    itemDescription:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const ViewItems = () => {
  return (
    <div className="container">
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Card
              imageSrc={item.imageSrc}
              itemType={item.itemType}
              itemAddress={item.itemAddress}
              itemDescription={item.itemDescription}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewItems;
