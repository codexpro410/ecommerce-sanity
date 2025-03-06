import PriceFormatter from '@/components/PriceFormatter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MY_ORDERS_QUERYResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react'

type Props = {
    order:MY_ORDERS_QUERYResult[number] | null;
    isOpen:boolean;
    onClose:()=>void;
}
export default function OrderDetailsDialog({order, isOpen, onClose}: Props) {
    if(!order) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-3xl'>
            <DialogHeader>
                <DialogTitle>Order Details - #{order?.orderNumber}</DialogTitle>
            </DialogHeader>
            <div className="">
                <p>
                    <strong>Customer:</strong> 
                    {order?.customerName}
                </p>
                <p>
                    <strong>Customer:</strong> 
                    {order?.customerName}
                </p>
                <p>
                    <strong>Email:</strong> 
                    {order?.email}
                </p>
                <p>
                    <strong>Date:</strong> 
                    {order?.orderDate && new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>status:</strong> 
                    {order?.status}
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>                
                </TableHeader>
                <TableBody>
                    {order?.products?.map((product,index) => (
                        <TableRow key={index}>
                            <TableCell className="flex items-center gap-2">{product?.product?.image && 
                            <Link href={`/product/${product?.product?.slug?.current}`} className='flex items-center gap-2'>
                                <Image src={urlFor(product?.product?.image).url()} alt={'product Image'} width={50} height={50} className='border rounded-sm hover:scale-105 hoverEffect' />
                                <p>{product?.product?.name}</p>
                            </Link>
                            }</TableCell>
                            <TableCell className="font-medium">{product?.quantity}</TableCell>
                            <TableCell className="font-medium">
                               <PriceFormatter amount={product?.product?.price} className='text-black font-medium' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4 text-right">
                <strong>Total: </strong>
                <PriceFormatter amount={order?.totalPrice} className='text-black font-medium' />
            </div>
        </DialogContent>
    </Dialog>
  )
}
