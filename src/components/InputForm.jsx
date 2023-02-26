import React, { useState } from 'react';
import AddressInput from './AddressInput';
import ItemTypeDropdown from './ItemTypeDropdown';

function InputForm() {
  const [address, setAddress] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');

  const handleAddressSubmit = (value) => {
    setAddress(value);
  };

  const handleItemTypeSubmit = (value) => {
    setSelectedItemType(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="address">Address:</label>
        <AddressInput onAddressSubmit={handleAddressSubmit} />
      </div>
      <div>
        <label htmlFor="item-type">Item Type:</label>
        <ItemTypeDropdown onItemTypeSubmit={handleItemTypeSubmit} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;