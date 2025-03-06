import React from 'react'
const infoArray = [
    {id:1,title:"Free Shipping",description :"Free Shipping over order $120"},
    {id:2,title:"Flexible Payment",description :"Pay with Multiple Payment Options"},
]
export default function SinglePageInfoSection() {
    return (
        <div className='flex flex-wrap items-center gap-5'>
      {infoArray.map(({title,description,id }) =>(
            <div key={id} className='border border-darkBlue/20 text-center p-3 hover:border-darkBlue hoverEffect rounded-md'>
        <p className="text-base font-semibold text-black">
            {title}
        </p>
        <p className="text-sm text-gray-500">
            {description }
        </p>
            </div>
        ))}
    </div>
  )
}
