import React from 'react'
;
import ItemTypeDropdown from './ItemTypeDropdown';
import AdressInput from './AddressInput';
import AddressInput from './AddressInput';
import ItemDescrip from './ItemDescrip';
import InputButton from './InputButton';


function PostPage() {
  return (
<div class="hero-content text-center sticky top-0 w-full">
  <div class="max-w-md mx-auto pt-20">
    <h1 class="text-5xl font-semibold mb-12">post an item </h1>
    <ItemTypeDropdown />
    <AddressInput />
    <ItemDescrip />
    <InputButton />
  </div>
  
</div>
  )
}

export default PostPage
