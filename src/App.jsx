import { useState, useEffect } from 'react'
import { db } from './config/firebase'
import { getDocs,collection, addDoc } from  'firebase/firestore'
import Hero from './components/PromoHero'
import AddressInput from './components/AddressInput'
import ItemTypeDropdown from './components/ItemTypeDropdown'
import ItemDescrip from './components/ItemDescrip'
import InputButton from './components/InputButton'


function App() {

  return (
    <div className="bg-lm-blue min-h-screen">
      <ItemTypeDropdown />
      <AddressInput />
      <ItemDescrip />
      <InputButton />
    </div>
  )
}

export default App
