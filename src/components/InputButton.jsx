import React from "react";
import PropTypes from "prop-types";

function InputButton({ onClick, label, isActive }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          onClick(e);
        }}
        className={`mt-4 px-6 py-6 text-white text-sm rounded-full border-transparent focus:border-transparent focus:ring-0 uppercase ${
          !isActive
            ? "btn-disabled"
            : "bg-buttons btn from-gray-400 to-buttons hover:from-gray-400 hover:to-buttons"
        }`}
      >
        {label}
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
