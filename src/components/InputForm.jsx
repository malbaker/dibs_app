import React, { useEffect, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import FinalInputButton from "./FinalInputButton";
import getAddress from "./Location";

function InputForm() {
  const [address, setAddress] = useState("");
  useEffect(() => {
    getAddress().then((address) => setAddress(address.formatted_address || ""));
  }, []);

  const [additionalNotes, setAdditionalNotes] = useState("");
  const [itemType, setItemType] = useState("");
  const [isItemTypeDropdownOpen, setIsItemTypeDropdownOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const [progressPercent, setProgressPercent] = useState(0);
  const [condition, setCondition] = useState("");
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [color, setColor] = useState("");
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const isActive =
    address !== "" &&
    additionalNotes !== "" &&
    itemType !== "" &&
    condition !== "" &&
    color !== "" &&
    progressPercent === 100 &&
    imgUrl != null;

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAdditionalNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleItemType = (type) => {
    setItemType(type);
    setIsItemTypeDropdownOpen(false);
  };

  const handleCondition = (condition) => {
    setCondition(condition);
    setIsConditionDropdownOpen(false);
  };

  const handleColor = (color) => {
    setColor(color);
    setIsColorDropdownOpen(false);
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
        additionalNotes,
        category: itemType,
        address,
        image: imgUrl,
        condition,
        color,
        expiration: Timestamp.fromDate(
          new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        ),
        timeadded: Timestamp.fromDate(new Date()),
        claimed: false,
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
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-dm-blue font-regular -mb-1">
            UPLOAD IMAGE
          </span>
        </label>
        <input
          className="font-light file-input file-input-buttons h-11 w-full max-w-lg rounded-full mb-3"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
        />
      </div>
      {/* Post address input */}
      <div className="form-control w-full max-w-xs ">
        <label className="label">
          <span className="label-text text-dm-blue font-regular -mb-1">
            ITEM LOCATION*
          </span>
        </label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder=""
          name="address"
          className="input input-md h-11 w-80 max-w-80 mt-0 rounded-full mb-3"
        />
      </div>

      <div className="form-control w-full max-w-xs -mb-1">
        <label className="label">
          <span className="label-text text-black font-regular">ADDITIONAL INFO</span>
        </label>
      </div>

      <div className="bg-buttons rounded-3xl flex flex-col px-5 py-4 mt-1 mb-4 ">
        {/* Post category dropdown */}
        <div className="relative my-2">
          <label className="label">
            <span className="label-text text-white font-thin -mb-1 -mt-4">
              Item Category
            </span>
          </label>
          <button
            className="input input-bordered font-light input-md w-80 h-11 rounded-full text-left pl-4"
            type="button"
            placeholder="select type"
            onClick={() => setIsItemTypeDropdownOpen(!isItemTypeDropdownOpen)}
          >
            {itemType || "select type"}
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
        <div className="relative -mt-1 mb-1">
          <label className="label">
            <span className="label-text text-white font-thin -mb-1">
              Item Condition
            </span>
          </label>
          <button
            className="input input-bordered font-light input-md w-80 h-11 rounded-full text-left pl-4"
            type="button"
            placeholder="select condition"
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
        {/* Post color dropdown */}
        <div className="relative inline-block -my-1">
          <label className="label">
            <span className="label-text text-white font-thin -mb-1">Item Color</span>
          </label>
          <button
            className="input input-bordered input-md w-80 h-11 rounded-full text-left font-light pl-4"
            type="button"
            placeholder="select color"
            onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
          >
            {color || "select color"}
          </button>
          {isColorDropdownOpen && (
            <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("red")}
              >
                red
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("blue")}
              >
                blue
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("green")}
              >
                green
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("yellow")}
              >
                yellow
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("black")}
              >
                black
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleColor("white")}
              >
                white
              </li>
            </ul>
          )}
        </div>

        {/* Post additional notes input */}
        <label className="label">
          <span className="label-text text-white font-thin -mb-3 mt-1">
            Additional Notes
          </span>
        </label>
        <textarea
          value={additionalNotes}
          onChange={handleAdditionalNotesChange}
          placeholder="write any additional notes about your item"
          className="input font-light input-bordered input-md w-full max-w-120 my-2 rounded-3xl pt-2 h-20"
        />
      </div>

      <div className="my-3 mt-6">
        {/* The button to open modal */}
        <label
          htmlFor="my-modal-4"
          className={`mt-2 px-10 py-4 text-white rounded-full border-transparent focus:border-transparent focus:ring-0 uppercase ${
            !isActive
              ? "btn-disabled"
              : "bg-buttons btn from-gray-400 to-buttons hover:from-gray-400 hover:to-buttons"
          }`}
        >
          Post item
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-xl font-light px-8 pt-5">
              are you sure you want to post this item?
            </h3>
            <div className="modal-action mb-5 mt-4 flex justify-center">
              <FinalInputButton
                onClick={(e) => {
                  handleSubmit(e);
                }}
                label="Yes"
              />
            </div>
          </label>
        </label>
      </div>
    </form>
  );
}
export default InputForm;
