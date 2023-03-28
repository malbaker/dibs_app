import React from "react";
import PropTypes from "prop-types";

function FinalInputButton({ onClick, label }) {
  return (
    <div className="flex justify-center ">
      <button
        onClick={(e) => {
          onClick(e);
        }}
        className={
          "mt-4 pl-10 pr-10 px-6 py-3 text-white rounded-full border-transparent focus:border-transparent focus:ring-0 uppercase bg-dm-blue btn from-gray-400 to-dm-blue hover:from-gray-400 hover:to-dm-blue"
        }
        style={{ fontSize: "14px" }}
      >
        {label}
      </button>
    </div>
  );
}

FinalInputButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default FinalInputButton;
