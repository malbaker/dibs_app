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
    <div className="drawer h-screen bg-lm-blue font-outfit">
      <BrowserRouter>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        <div className="hero min-h-screen">
      <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/view" element={<ViewPage />} />
      </Routes>
        </div>
      </div>
      <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App

