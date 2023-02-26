import { useState, useEffect } from 'react'
import { db } from './config/firebase'
import { getDocs,collection, addDoc } from  'firebase/firestore'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="bg-lm-blue min-h-screen">
      <Navbar />
    </div>
  )
}

export default App
