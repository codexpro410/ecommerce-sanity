import { Star } from 'lucide-react';
import React from 'react'

export default function Stars() {
  return (
<div className="flex items-center text-gray-500 gap-1">
    {Array.from({length:5}).map((_,index)=>{
        const rating = index === 4;
        return (
        <Star key={index} size={16} fill={!rating ? '#fca99b' : 'transparent'} strokeWidth={1.5} className={`${rating ? 'text-gray-500':'text-lightOrange'}`} />
        )
    })}
        {/* {Array.from({length:5}).map((_,index)=>(<span key={index} className='text-sm '>⭐</span>))} */}
</div>
  )
}
