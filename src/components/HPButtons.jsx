import React from 'react';

function HPButtons() {
  return (
    <div className="flex justify-center">
    <div className="flex flex-col space-y-3">
      <button className="bg-buttons hover:bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full">
      POST ITEM
    </button>
      
    <button className="bg-buttons hover:bg-buttons text-dm-blue font-outfit py-2 px-10 rounded-full">
      VIEW ITEMS
    </button>

    </div>
    </div>
  );
}

export default HPButtons;