import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import InputButton from "./InputButton";

function InputForm() {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);

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

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      },
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        description,
        category: itemType,
        address,
        image: imgUrl,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    window.location.href = "/view";
  };

  return (
    <form className="flex flex-col items-center">
      {/* File upload for post image */}
      <div className="form-control w-full max-w-xs ">
        <label className="label">
          <span className="label-text text-dm-blue font-semibold">
            Upload an image, limit 1(one)
          </span>
        </label>
        <input
          className="file-input file-input-bordered w-full max-w-xs rounded-full mb-3"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
      {/* Post address input */}
      <div className="form-control w-full max-w-xs ">
        <label className="label">
          <span className="label-text text-dm-blue">Street Address*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="123 Main Street, Awesomeville, Maine, 10034"
          name="address"
          className="input input-bordered input-md w-full max-w-full mt-0 rounded-full mb-3"
        />
      </div>

      {/* Post category dropdown */}
      <div className="form-control w-full max-w-xs ">
        <label className="label">
          <span className="label-text text-dm-blue font-semibold">
            Item Category*
          </span>
        </label>
        <div className="relative inline-block">
          <button
            className="input input-bordered input-md w-80 h-12 rounded-full text-left pl-4 mb-2"
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
      </div>

      {/* Post description input */}
      <div className="form-control w-full max-w-xs ">
        <label className="label">
          <span className="label-text text-dm-blue font-semibold ">Description</span>
        </label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Large, red & green sofa, seats 10 adults"
          className="input input-bordered w-full max-w-md mt-1 rounded-full py-3 text-sm"
        />
      </div>

      <InputButton
        onClick={(e) => {
          handleSubmit(e);
        }}
        label="post item"
        isActive={
          !!(
            progressPercent === 100 &&
            imgUrl != null &&
            address !== "" &&
            description !== "" &&
            itemType !== ""
          )
        }
      />
    </form>
  );
}

export default InputForm;
