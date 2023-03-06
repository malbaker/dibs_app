import React from 'react';

function InputButton({ onClick, label, isActive }) {
  return (
    <div className="flex justify-center">
      <button onClick={(e) => {onClick(e)}} 
      className={`mt-4 text-dm-blue rounded-full border-transparent focus:border-transparent focus:ring-0
      ${!isActive ? 'btn-disabled' : 'btn bg-buttons hover:bg-buttons'}`}>
        {isActive? label : "Please complete all fields"}
      </button>
    </div>
  );
}

export default InputButton;