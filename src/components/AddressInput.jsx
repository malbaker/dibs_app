import React, { useState } from 'react';

function AddressInput({ onAddressSubmit }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddressSubmit(address);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <label className="mt-2"></label>
        <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="enter your address"
            name="address"
            className="input input-bordered input-md w-full max-w-full mt-2 rounded-full"
            />
      </form>
    </div>
  );
}

export default AddressInput;