
import { Product } from '@/sanity.types';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import userCartStore from '@/store';

type Props = {
    product: Product;
    className?:string
    // borderStyle?:string;
}


export default function QuantityButtons({product, className}: Props) {
     const { addItem, getItemCount, removeItem } = userCartStore();
    const handleAddProduct=()=>{
        addItem(product);
        toast.success(`Quantity increased Successfully`);
    }
    const handleRemoveProduct=()=>{
        removeItem(product._id);
        if (itemCount > 1) {
            toast.success("Quantity Decreased Successfully");
        }else{
            toast.success(`${product?.name?.substring(0.12)}...removed Successfully`);
        }
    }
    const itemCount = getItemCount(product._id);
    // const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn('flex items-center gap-1 pb-1 text-base', className)}>
        <Button  onClick={handleRemoveProduct} variant={"outline"} size={"icon"} className='w-6 h-6'><Minus size={24} strokeWidth={1.5} /></Button>
        <span className='font-semibold w-8 text-center text-darkBlue'>{itemCount}</span>
        <Button onClick={handleAddProduct} variant={"outline"} size={"icon"} className='w-6 h-6'><Plus size={24} strokeWidth={1.5} /></Button>
    </div>
  )
}
// disabled={itemCount <= 1}
