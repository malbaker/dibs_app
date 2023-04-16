/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { HiArrowsUpDown } from "react-icons/hi2";

function Filter({ filter, setFilter, data, setPosts }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const onClick = () => setShowDropdown(!showDropdown);

  document.addEventListener("click", (e) => {
    if (
      showDropdown &&
      !document.getElementById("filterDropdown").contains(e.target) &&
      !document.getElementById("filterButton").contains(e.target)
    ) {
      setShowDropdown(false);
    }
  });

  return (
    <div className="flex items-center" style={{ margin: "20px" }}>
      <button
        onClick={onClick}
        id="filterButton"
        className="ml-auto -mt-12 rounded-full bg-buttons p-2 flex justify-center items-center w-12"
      >
        <HiArrowsUpDown className="text-white" />
      </button>

      <div id="filterDropdown">
        {showDropdown ? (
          <FilterDropdown
            filter={filter}
            setFilter={setFilter}
            data={data}
            setPosts={setPosts}
          />
        ) : null}
      </div>
    </div>
  );
}

function FilterDropdown({ filter, setFilter, data, setPosts }) {
  // Filter options
  const options = {
    category: [
      { index: 0, name: "furniture" },
      { index: 1, name: "home decor" },
      { index: 2, name: "clothing" },
      { index: 3, name: "tech items" },
      { index: 4, name: "other" },
    ],
    condition: [
      { index: 0, name: "new" },
      { index: 1, name: "old" },
    ],
  };

  // State that will keep track of which checkboxes are checked using boolean
  const [selected, setSelected] = useState(() => {
    let temp = {};
    Object.keys(options).forEach((key) => {
      temp[key] = new Array(options[key].length).fill(false);

      // In case you close dropdown and reopen it, this ensures the dropdown looks the same way you left it
      for (const option of options[key]) {
        if (filter[key] && filter[key].indexOf(option["name"]) >= 0) {
          temp[key][option["index"]] = true;
        }
      }
    });
    return temp;
  });

  const handleOnChange = (key, index) => {
    setSelected((prevSelected) => {
      let newSelected = {};
      Object.keys(prevSelected).forEach((key) => {
        newSelected[key] = [...prevSelected[key]];
      });

      // Records whether checkbox was selected/unselected
      newSelected[key][index] = !prevSelected[key][index];

      // Updates the filter criteria based on selected items
      setFilter((prevFilter) => {
        let newFilter = {};
        Object.keys(prevFilter).forEach((key) => {
          newFilter[key] = [...prevFilter[key]];
        });

        if (newSelected[key][index]) {
          if (
            key in prevFilter &&
            prevFilter[key].indexOf(options[key][index].name) < 0
          ) {
            newFilter[key].push(options[key][index].name);
          } else if (!(key in prevFilter)) {
            newFilter[key] = [options[key][index].name];
          }
        } else if (newFilter[key]) {
          const indexToRemove = newFilter[key].indexOf(options[key][index].name);

          if (indexToRemove >= 0) {
            newFilter[key].splice(indexToRemove, 1);
          }
        }

        // Updates posts based on the new filter criteria
        setPosts(() => {
          let posts = data.filter((post) => {
            for (let key in newFilter) {
              if (
                newFilter[key].length > 0 &&
                newFilter[key].indexOf(post[key]) < 0
              ) {
                return false;
              }
            }
            return true;
          });

          return posts;
        });

        return newFilter;
      });

      return newSelected;
    });
  };

  let inputs = {};
  Object.keys(options).forEach((key) => {
    inputs[key] = [];

    for (let itemType of options[key]) {
      inputs[key].push(
        <div key={`div-${itemType.index}`}>
          <input
            className="flex-direction-row"
            type="checkbox"
            id={`checkbox-${itemType.index}`}
            name={itemType.name}
            value={itemType.name}
            checked={selected[key][itemType.index]}
            onChange={() => handleOnChange(key, itemType.index)}
          />
          <label
            htmlFor={`custom-checkbox-${itemType.index}`}
            key={`label-${itemType.index}`}
          >
            {itemType.name}
          </label>
        </div>,
      );
    }
  });

  return (
    <div className="bg-gray-300 rounded-3xl p-4">
      <div className="flex flex-col text-dm-blue -mt-2 rounded-3xl text-left m-2">
        <h3 className="font-outfit font-light ml-2 mt-3">Item Type:</h3>
        <div className="flex flex-wrap ml-2">
          {inputs["category"].map((category, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-full text-sm font-outfit text-gray-700 mr-2 mt-2 px-3 py-1 w-30"
            >
              {category}
            </div>
          ))}
        </div>
        <h3 className="font-outfit font-light ml-2 mt-3">Item Condition:</h3>
        {inputs["condition"].map((category, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-full text-sm font-outfit text-gray-700 mr-2 mt-2 px-3 py-1 w-20"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
};

FilterDropdown.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
};

export default Filter;
