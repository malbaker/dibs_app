import React, { useState } from 'react';

function AddressInput({ onAddressSubmit }) {
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    onAddressSubmit(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mt-2"></label>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="enter your address"
        className="input input-bordered input-md w-full max-w-xs mt-2 rounded-full"
      />
    </div>
  );
}

export default AddressInput;