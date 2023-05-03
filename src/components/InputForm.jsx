import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  limit,
  GeoPoint,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FinalInputButton from "./FinalInputButton";
import getAddress from "./Location";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function InputForm() {
  const [user] = useAuthState(auth);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  useEffect(() => {
    getAddress().then((address) => {
      setAddress(address.formatted_address || "");
      setLat(address.lat || null);
      setLng(address.lng || null);
      setValidAddress(true);
    });
  }, []);

  //const [additionalNotes, setAdditionalNotes] = useState("");
  const [itemType, setItemType] = useState("");
  const [isItemTypeDropdownOpen, setIsItemTypeDropdownOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const [progressPercent, setProgressPercent] = useState(0);
  const [condition, setCondition] = useState("");
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
  const [color, setColor] = useState("");

  const isActive =
    validAddress &&
    address !== "" &&
    itemType !== "" &&
    condition !== "" &&
    progressPercent === 100 &&
    imgUrl != null;

  const handleAddressChange = (address) => {
    setAddress(address);
    setValidAddress(false);
  };

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);
    setLat(latLng.lat);
    setLng(latLng.lng);
    setValidAddress(true);
  };

  /* const handleAdditionalNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  }; */

  const handleItemType = (type) => {
    setItemType(type);
    setIsItemTypeDropdownOpen(false);
  };

  const handleCondition = (condition) => {
    setCondition(condition);
    setIsConditionDropdownOpen(false);
  };

  const handleColorChange = (color) => {
    setColor(color);
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
        category: itemType,
        address,
        coords: new GeoPoint(lat, lng),
        image: imgUrl,
        condition,
        color,
        expiration: Timestamp.fromDate(
          new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        ),
        timeadded: Timestamp.fromDate(new Date()),
        claimed: false,
        likes: 0,
      });
      console.log("Document written with ID: ", docRef.id);
      if (user) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", user.uid),
          limit(1),
        );
        const post = await getDoc(docRef);
        const users = await getDocs(q);

        const userRef = doc(db, "users", users.docs[0].id);
        await updateDoc(userRef, {
          myPosts: arrayUnion(post.id),
        });

        console.log(`Updated user ${user.uid} with their post ${post.id}!`);
      }
      window.location.href = `/view#${docRef.id}`;
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <form className="flex flex-col items-center mt-1 max-w-xs w-full mx-auto">
      {/* File upload for post image */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-dm-blue font-regular -mb-1">
            Upload image*
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

      <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleSelect}
        searchOptions={{ types: ["address"] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="form-control w-full">
            {validAddress ? (
              <label className="label justify-start text-left">
                <span className="label-text text-dm-blue font-regular -mb-1 text-left">
                  Item Address*
                </span>
              </label>
            ) : (
              <label className="label">
                <span className="label-text font-semibold text-red-500 -mb-1">
                  Please enter a valid address
                </span>
              </label>
            )}
            <input
              className="input input-md h-11 w-full max-w-xs mt-0 rounded-full mb-3"
              type="text"
              {...getInputProps({
                placeholder: "123 Main St, Boston, MA, USA",
                className: validAddress
                  ? "address-input input input-md h-11 w-full max-w-full mt-0 rounded-full mb-3"
                  : "location-search-input address-input input input-md input-warning h-11 w-full max-w-full mt-0 rounded-full mb-3",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, idx) => {
                const className = suggestion.active
                  ? "suggestion-item--active rounded-sm text-dm-blue bg-sky-400 hover:bg-sky-400 cursor-pointer"
                  : "suggestion-item rounded-sm text-dm-blue cursor-pointer bg-gray-100";

                return (
                  <div
                    key={idx}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div className="form-control w-full max-w-xs -mb-1">
        <label className="label">
          <span className="label-text text-black font-regular">ADDITIONAL INFO</span>
        </label>
      </div>
      <div className="bg-buttons rounded-3xl w-full flex flex-col px-2 py-4 mt-1 mb-2 ">
        {/* Post category dropdown */}
        <div className="relative my-2">
          <label className="label">
            <span className="label-text text-white font-thin -mb-1 -mt-4">
              Item Category*
            </span>
          </label>
          <button
            className="input input-bordered font-light input-md w-full h-11 rounded-full text-left"
            type="button"
            placeholder="select type"
            onClick={() => setIsItemTypeDropdownOpen(!isItemTypeDropdownOpen)}
          >
            {itemType || "select type"}
          </button>
          {isItemTypeDropdownOpen && (
            <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleItemType("furniture")}
              >
                furniture
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleItemType("home decor")}
              >
                home decor
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleItemType("clothing")}
              >
                clothing
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleItemType("tech items")}
              >
                tech items
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
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
              Item Condition*
            </span>
          </label>
          <button
            className="input input-bordered font-light input-md w-full h-11 rounded-full text-left pl-4"
            type="button"
            placeholder="select condition"
            onClick={() => setIsConditionDropdownOpen(!isConditionDropdownOpen)}
          >
            {condition || "select condition"}
          </button>
          {isConditionDropdownOpen && (
            <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleCondition("new")}
              >
                brand new
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleCondition("old")}
              >
                like new
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleCondition("old")}
              >
                used - excellent
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleCondition("old")}
              >
                used - good
              </li>
              <li
                className="font-outfit font-light px-3 py-2 hover:bg-gray-200 cursor-pointer lowercase"
                onClick={() => handleCondition("old")}
              >
                used - fair
              </li>
            </ul>
          )}
        </div>
        {/* Post color dropdown */}
        <div className="relative inline-block -my-1">
          <label className="label">
            <span className="label-text text-white font-thin -mb-1">Item Color</span>
          </label>
          <input
            className="input input-bordered input-md w-full h-11 rounded-full text-left font-light pl-4"
            type="text"
            placeholder="what color is your item?"
            onChange={handleColorChange}
          />
        </div>

        {/* Post additional notes input */}
        {/*  <label className="label">
          <span className="label-text text-white font-thin -mb-3 mt-1">
            Additional Notes
          </span>
        </label>
        <textarea
          value={additionalNotes}
          onChange={handleAdditionalNotesChange}
          placeholder="write any additional notes about your item"
          className="input font-light input-bordered input-md w-full max-w-120 my-2 rounded-3xl pt-2 h-20"
        /> */}
      </div>

      <div className="my-3">
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
            <div className="modal-action lowercase mb-5 mt-4 flex justify-center">
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
