import React from 'react';

function InputButton({ onClick, label }) {
  return (
    <div className="flex justify-center">
      <button onClick={(e) => {onClick(e)}} className="btn mt-4 bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0">
        {label}
      </button>
    </div>
  );
}

export default InputButton;