import React from 'react'
import loaderImage from '@/images/loaderImage.png'
import Image from 'next/image'
export default function Loader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full min-h-screen  flex items-center justify-center bg-white z-50 p-10'>
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-dotted border-gray-800 animate-spin"/>
      <Image src={loaderImage} alt="loader" className="w-14 h-14 object-cover"/>
        </div>
      {/* </div> */}
      {/* Loader */}
    </div>
  )
}
