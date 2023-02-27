import React from 'react'
import HPButtons from './HPButtons'


function HomePage() {
  return (
    <div className="hero-content text-center">
    <div className="max-w-md max-h-screen">
      <h1 className="text-5xl font-semibold mb-12">find free <p className="break-all"> stuff near </p> <p className="break-all"> you. </p> </h1>
    <HPButtons />
    </div>
  </div>
  )
}

export default HomePage
