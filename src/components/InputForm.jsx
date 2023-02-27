import React, { useState } from 'react';
import AddressInput from './AddressInput';
import ItemDescrip from './ItemDescrip';
import ItemTypeDropdown from './ItemTypeDropdown';
import InputButton from './InputButton';

function InputForm({ onInputSubmit }) {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [itemType, setItemType] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleItemTypeChange = (event) => {
    setItemType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onInputSubmit({ address, description, itemType });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <AddressInput onAddressSubmit={handleAddressChange} />
      <ItemDescrip onDescriptionSubmit={handleDescriptionChange} />
      <ItemTypeDropdown onItemTypeSubmit={handleItemTypeChange} />
      <InputButton label="post item" />
    </form>
  );
}

export default InputForm;