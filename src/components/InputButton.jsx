import React from "react";
import PropTypes from "prop-types";

function InputButton({ onClick, label, isActive }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          onClick(e);
        }}
        className={`mt-4 px-6 py-3 text-white rounded-full border-transparent focus:border-transparent focus:ring-0 uppercase ${
          !isActive ? "btn-disabled": "bg-gray-400 cursor-not-allowed btn from-gray-400 to-text-dm-blue hover:from-gray-400 hover:to-buttons"
        }`}
        style={{fontSize: "14px"}}
      >
        {isActive ? label : "post item"}
      </button>
    </div>
  );
}
InputButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
export default InputButton;
