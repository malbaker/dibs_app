import { useState, useEffect } from 'react'
import { db } from './config/firebase'
import { getDocs,collection, addDoc } from  'firebase/firestore'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage'; // import the PostPage component
import ViewPage from './components/ViewPage'





function App() {

  return (
    <div className="bg-lm-blue min-h-screen">
    </div>
  );
}

export default App

