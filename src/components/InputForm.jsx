import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import FinalInputButton from "./FinalInputButton";
import CloseButton from "./CloseButton";

function InputForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [itemType, setItemType] = useState("");
  const [isItemTypeDropdownOpen, setIsItemTypeDropdownOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const [progressPercent, setProgressPercent] = useState(0);
  const [condition, setCondition] = useState("");
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleItemType = (type) => {
    setItemType(type);
    setIsItemTypeDropdownOpen(false);
  };

  const handleCondition = (condition) => {
    setCondition(condition);
    setIsConditionDropdownOpen(false);
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
        condition,
        expiration: Timestamp.fromDate(
          new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        ),
      });
      console.log("Document written with ID: ", docRef.id);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
    window.location.href = "/view";
  };

  /* For modal*/
  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="write a short description"
        className="input input-bordered input-md w-full max-w-full my-2 rounded-full pt-2"
      />
      {/* Post category dropdown */}
      <div className="relative inline-block my-2">
        <button
          className="input input-bordered input-md w-80 h-12 rounded-full text-left pl-4"
          type="button"
          placeholder="select item type"
          onClick={() => setIsItemTypeDropdownOpen(!isItemTypeDropdownOpen)}
        >
          {itemType || "select item type"}
        </button>
        {isItemTypeDropdownOpen && (
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
      {/* Post condition dropdown */}
      <div className="relative inline-block my-2">
        <button
          className="input input-bordered input-md w-80 h-12 rounded-full text-left pl-4"
          type="button"
          placeholder="select item condition"
          onClick={() => setIsConditionDropdownOpen(!isConditionDropdownOpen)}
        >
          {condition || "select condition"}
        </button>
        {isConditionDropdownOpen && (
          <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleCondition("new")}
            >
              new
            </li>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
              onClick={() => handleCondition("old")}
            >
              old
            </li>
          </ul>
        )}
      </div>

      <div>
        <a
          href="#my-modal-2"
          className="btn mt-3 rounded-full pl-6 pr-6 bg-buttons border-none"
        >
          post item
        </a>

        <div className="modal" id="my-modal-2">
          <div className="modal-box">
            <h3 className="font-outfit text-xl pl-4 pr-4 pt-7">
              are you sure you would like to post this item?
            </h3>
            <div className="modal-action mr-10 mb-5 mt-4">
              <FinalInputButton
                onClick={(e) => {
                  handleSubmit(e);
                }}
                label="yes"
              />
              <CloseButton label="no" type="button" onClick={handleCloseModal} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default InputForm;
