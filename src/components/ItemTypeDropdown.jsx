import React, { useState } from "react";

function ItemTypeDropdown() {
  const [selectedOption, setSelectedOption] = useState("Select item type");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-md">
        <div className="text-gray-500 font-medium"></div>
        <div className="relative inline-block">
          <button
            className="input input-bordered input-md w-80 h-12 rounded-full"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption}
          </button>
          {isDropdownOpen && (
            <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-md z-10">
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("furniture")}
              >
                furniture
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("home decor")}
              >
                home decor
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("clothing")}
              >
                clothing
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("tech items")}
              >
                tech items
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick("other")}
              >
                other
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemTypeDropdown;