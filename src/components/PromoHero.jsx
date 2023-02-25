import React from 'react'

// This is the promo page hero component for ads
export default function PromoHero() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Moving on a budget?</h1>
                    <p className="py-6">Our core problem is the accumulation of excess waste as a result of students moving in/out of their apartments and abandoning used furniture on the street at start/end of semester.</p>
                    <p className='py-6'>Our solution helps off-campus students who want to find / dispose of furniture by easily displaying nearby items, free of charge.</p>
                    <p className='py-6'>Interested? Let us know your thoughts in <a className='text-blue-500 underline' href='https://forms.gle/cM6hNc2aLpWtxBya7'>this survey</a>. </p>
                </div>
            </div>
        </div>
    )
}
