import React from "react";
import PropTypes from "prop-types";

function CloseButton({ label, onClick }) {
  return (
    <button
      className="mt-4 px-6 pl-7 pr-7 py-3 text-dm-blue rounded-full border-dm-blue focus:border-transparent focus:ring-0 uppercase bg-transparent btn from-gray-400 to-dm-blue hover:from-gray-400 hover:to-dm-blue"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

CloseButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
