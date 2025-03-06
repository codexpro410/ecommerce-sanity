import React from 'react'

type Props = {
    children:React.ReactNode
}
export default function ProductCartBarIcon({children}:Props) {
  return (
    <div className="border shadow-md bg-white p-2 rounded-xl hover:bg-darkBlue hover:text-white hoverEffect flex items-center justify-between mb-2">
        {children}
    </div>
  )
}
