import { useState, useEffect } from 'react'
import { db } from './config/firebase'
import { getDocs,collection, addDoc } from  'firebase/firestore'
import Hero from './components/PromoHero'

function App() {

  return (
    <div className="App">
      <h1 className='text-xl text-white text-center my-2 mx-auto'> Home page</h1>
    </div>
  )
}

export default App
