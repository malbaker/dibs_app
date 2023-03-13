import React, { useState } from "react";
import { db } from "./config/firebase";
import { collection, addDoc } from "firebase/firestore";
import InputButton from "./components/InputButton";

class Post {
  constructor(description, category, address) {
    this.description = description;
    this.category = category;
    this.address = address;
  }
}

function InputForm({ onInputSubmit }) {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleItemType = (type) => {
    setItemType(type);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        description: description,
        category: itemType,
        address: address,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    window.location.href = "/view";
  };

  return (
    <form className="flex flex-col items-center">
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="enter your address"
        name="address"
        className="input input-bordered input-md w-full max-w-full mt-2 rounded-full"
      />
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="write a short description about your item"
        className="input input-bordered w-full max-w-md my-5 rounded-full"
        style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
      />
      <div className="relative inline-block">
        <button
          className="input input-bordered input-md w-80 h-12 rounded-full text-left pl-4"
          type="button"
          placeholder="select item type"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {itemType || "select item type"}
        </button>
        {isDropdownOpen && (
          <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleItemType("furniture")}
            >
              furniture
            </li>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleItemType("home decor")}
            >
              home decor
            </li>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleItemType("clothing")}
            >
              clothing
            </li>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleItemType("tech items")}
            >
              tech items
            </li>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleItemType("other")}
            >
              other
            </li>
          </ul>
        )}
      </div>

      <InputButton onClick={handleSubmit} label="post item" />
    </form>
  );
}

export default InputForm;
