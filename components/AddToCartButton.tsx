'use client';
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import userCartStore from '@/store';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PriceFormatter from './PriceFormatter';
import QuantityButtons from './QuantityButtons';
import { Button } from './ui/button';

type Props = {
    product: Product;
    className?:string
}
export default function AddToCartButton({product, className}: Props) {
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = userCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if(!isClient) return null;
  const itemCount = getItemCount(product._id);
  // const itemCount = 0;
  const isOutOfStock = product?.stock === 0;
    const handleAddToCart =()=>{
        addItem(product);
        toast.success(`${product?.name?.substring(0.12)}...added Successfully`);
    }

  return (
    <div className="">
      {itemCount ? 
      <div className="text-sm">
        <div className='flex items-center justify-between'>
            <span className='text-xs text-muted-foreground'>Quantity</span>
            <QuantityButtons product={product}/>
        </div>
        <div className="flex items-center justify-between border-t pt-1">
          <span>subtotal</span>
          <PriceFormatter amount={product?.price ? product?.price * itemCount : 0}/>
        </div>
      </div>
      :
      <Button onClick={handleAddToCart} disabled={isOutOfStock} className={cn("bg-darkBlue/10 text-black border-darkBlue border py-2 mt-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-600 disabled:border-darkBlue/10 ", className)}>
        Add To Cart
      </Button>
      }
    </div>

  )
}
