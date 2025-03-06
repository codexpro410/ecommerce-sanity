'use client';
import Container from '@/components/Container';
import EmptyCart from '@/components/EmptyCart';
import Loader from '@/components/Loader';
import NoAccessToCart from '@/components/NoAccessToCart';
import PriceFormatter from '@/components/PriceFormatter';
import QuantityButtons from '@/components/QuantityButtons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import userCartStore from '@/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { createCheckoutSession, Metadata} from '@/actions/createCheckoutSession'
export default function CartPage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const {
      deleteCartProduct,
      getTotalPrice,
      getItemCount,
      getSubTotalPrice,
      resetCart,
      getGroupedItems
    } = userCartStore();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if(!isClient) return <Loader/>;

  const handleCheckout = async()=>{
    setLoading(true);
    try {
      const metadata:Metadata ={
        orderNumber:crypto.randomUUID(),
        customerName:user?.fullName ?? "Unknown",
        customerEmail:user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId:user?.id ?? "Unknown"
      }
      const checkoutUrl = await createCheckoutSession(getGroupedItems(),metadata)
      if(checkoutUrl){
        window.location.href = checkoutUrl;
        // console.log('checkoutUrl:',checkoutUrl)
      }
    } catch (error) {
      console.log('error creating checkout session:',error)
    }finally{
    setLoading(false);

    }
    toast.success("Checkout will apply soon");
  }
  const handleDeleteProduct =(id:string)=>{
    // setLoading(true);
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  }
  const handleResetCart = ()=>{
    const confirm = window.confirm("Are you sure you want to reset the cart?");
    if (confirm) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  }
  return (
    <div>
    {isSignedIn ? 
      <Container>
        {getGroupedItems().length > 0 ? 
        <>
        <div className='flex items-center gap-2 py-2'>
          <ShoppingBag className='w-6 h-6 text-primary'/>
          <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
        </div>
        <div className='grid lg:grid-cols-3 md:gap-8 pb-40'>
        {/* <div className='lg:col-span-1'> */}
          {/* <div className='fixed bottom-0 left-0 w-full bg-lightBlue md:hidden lg:col-span-1'> */}
              {/* <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border"> */}
              <div className="bg-white p-4 rounded-lg border 
    md:block md:relative md:bg-transparent 
    fixed bottom-0 left-0 w-full shadow-lg z-50">
              <div className="bg-white p-4 mx-4 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {/* 1 */}
                    <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()}/>
                        </div>
                {/* 1 */}
                        <div className="flex justify-between items-center">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
                        </div>
                        <Separator/>
                        <div className="flex justify-between items-center">
                        <span className='text-black font-semibold'>Total</span>
                        <PriceFormatter className='text-black' amount={getTotalPrice()}/>
                        </div>
                        <div className="flex flex-col gap-2">
                        <Button onClick={handleCheckout} disabled={loading} className="">{loading ? "Loading..." : "Proceed to Checkout"}</Button>
                        <Link href={'/'} className="text-center hover:underline hoverEffect hover:text-darkBlue text-primary text-sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
              <div className="flex justify-between mb-2">
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
              <h2 className='col-span-2 md:col-span-3'>Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>
            <div className="bg-white border border-t-0 rounded-br-lg rounded-bl-lg">
            {getGroupedItems()?.map(({product})=>{
              const itemCount = getItemCount(product?._id);
              return (
                <div key={product?._id} className="grid grid-cols-5 md:grid-cols-6 border-b border-b-red-600 p-2.5 last:border-b-0">
                  <div className="col-span-2 md:col-span-3 flex items-center">
                    <Trash2 className='w-4 h-4 md:h-5 mr-1 to-gray-500 hover:text-red-600 hoverEffect' onClick={()=>handleDeleteProduct(product?._id)}/>
                    {/* <Trash2 className='w-4 h-4 md:h-5 mr-1 to-gray-500 hover:text-red-600 hoverEffect' onClick={() => deleteCartProduct(product?._id)}/> */}
                    {product?.image && 
                    <Link href={`/product/${product?.slug?.current}`} className='border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group'>
                      <Image src={urlFor(product?.image).url()} alt={'productImage'} width={50} height={50} className='w-10 h-10 md:w-full md:h-14 object-cover rounded-md group-hover:scale-105 overflow-hidden hoverEffect'/>
                      </Link>}
                    <h2 className='text-sm'>{product?.name}</h2>
                  </div>
                    <div className="flex items-center">
                      <PriceFormatter amount={product?.price} />
                    </div>
                    <QuantityButtons product={product} className='text-sm gap-0 md:gap-1' />
                    <div className="flex items-center">
                      <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
                    </div>
                </div>
              )
              })}
              <Button variant={'destructive'} onClick={handleResetCart} className="m-5 font-semibold ">Rest Cart</Button>
              </div>
          </div>
        </div>
        </>
        :
        <EmptyCart/>
        }
      </Container>
      :
      <NoAccessToCart/>
      
     }
    </div>
  )
}
