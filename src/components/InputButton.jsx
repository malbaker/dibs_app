import React from "react";
import PropTypes from "prop-types";

function InputButton({ onClick, label, isActive }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          onClick(e);
        }}
        className={`mt-4 text-dm-blue rounded-full border-transparent focus:border-transparent focus:ring-0 ${
          !isActive ? "btn-disabled" : "btn bg-buttons hover:bg-buttons"
        }`}
      >
        {isActive ? label : "Please complete all fields"}
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
