import React from 'react'
import { Heart, Eye, ArrowLeftRight, ShoppingBag } from "lucide-react";
import ProductCartBarIcon from './ProductCartBarIcon';

const icons = [
  { id: "heart", component: <Heart size={24} strokeWidth={1.5} /> },
  { id: "eye", component: <Eye size={24} strokeWidth={1.5} /> },
  { id: "swap", component: <ArrowLeftRight size={24} strokeWidth={1.5} /> },
  { id: "cart", component: <ShoppingBag size={24} strokeWidth={1.5} /> }
];
export default function ProductCartBar() {
  return (
    <div className='text-gray-500 text-lg flex items-center justify-center gap-2.5'>
      {icons.map(({ id, component }) => (
        <ProductCartBarIcon key={id}>{component}</ProductCartBarIcon>
      ))}
    </div>
  )
}
