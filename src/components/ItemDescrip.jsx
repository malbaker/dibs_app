import React, { useState } from 'react';

function ItemDescrip({ onDescriptionSubmit }) {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    onDescriptionSubmit(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="write a short description about your item"
        className="input input-bordered w-full max-w-md mt-5 rounded-full"
        style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
      />
    </div>
  );
}

export default ItemDescrip;