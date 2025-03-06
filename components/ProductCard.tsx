import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductCartBar from './ProductCartBar'
// import { Star } from 'lucide-react'
import PriceView from './PriceView'
import AddToCartButton from './AddToCartButton'
import Stars from './Stars'
type Props = {
    product:Product
}
export default function ProductCard({product}:Props) {
  const isStock = product?.stock !== 0;
  return (
    <div className='border border-gray-300 rounded-lg overflow-hidden group text-sm'>
            <div className='border-b border-b-gray-300 overflow-hidden relative'>
            {product?.image && (
                // 
                <Link href={`/product/${product?.slug?.current}`}>
                <Image src={urlFor(product?.image).url()} alt={"product image"} width={500} height={500} loading='lazy' className={`w-full max-h-96 object-cover object-center transition-all duration-300 ease-in-out ${product?.stock !== 0 && 'group-hover:scale-110'}`} />
                </Link>
            )}
            {product?.stock === 0 && (<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <p className='text-lg font-bold text-white'>out of stock</p>
              </div>)}
            {product?.status && product?.stock !== 0 && (
              <div className="absolute left-1 top-1 z-10 flex items-center flex-col space-x-1 group-hover:opacity-0 transition-opacity duration-300">
                  {product?.status?.split("").map((char,index)=> <span key={index} className='font-semibold uppercase'>{char}</span>)}
              </div>
            )}
            { isStock &&
              <div className='absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4 hoverEffect'>
                <ProductCartBar/>
              </div>
            }
            </div>
            {/* Description */}
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className='text-gray-500 font-medium'>Snacks</p>
                <Stars/>
              </div>
              <p className='text-base text-gray-600 tracking-wide font-semibold line-clamp-1 capitalize'>{product?.name}</p>
              <PriceView price={product?.price} discount={product?.discount} label={product?.label}/>
              <AddToCartButton product={product}/>
            </div>
    </div>
  )
}
