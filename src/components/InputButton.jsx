import React from 'react';

function InputButton({ onClick, label }) {
  return (
    <div className="flex justify-center">
      <button onClick={onClick} className="btn mt-4 bg-buttons hover:bg-buttons rounded-full border-transparent focus:border-transparent focus:ring-0">
        post item
      </button>
    </div>
  );
}

export default InputButton;