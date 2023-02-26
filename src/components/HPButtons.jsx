import React from 'react';

function HPButtons() {
  return (
    <div className="flex justify-center">
    <div className="flex flex-col space-y-3 text-xl font-semibold ">
      <button className="bg-buttons hover:bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full">
      post item
    </button>
      
    <button className="bg-buttons hover:bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full">
      view items
    </button>

    </div>
    </div>
  );
}

export default HPButtons;