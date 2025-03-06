import { Product } from '@/sanity.types'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({products}:{products:Product[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.map((product)=>(
                <ProductCard product={product} key={product._id} />
            ))}
        </div>
  )
}
