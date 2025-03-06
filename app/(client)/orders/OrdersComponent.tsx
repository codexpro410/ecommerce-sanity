'use client';
import PriceFormatter from "@/components/PriceFormatter";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderDetailsDialog from "./OrderDetailsDialog";

export default function OrdersComponent({orders}:{orders:MY_ORDERS_QUERYResult}) {
    const [ selectedOrder, setSelectedOrder] = useState<MY_ORDERS_QUERYResult[number] | null>(null)
    const handleOrderClicked = (order:MY_ORDERS_QUERYResult[number])=>{
        setSelectedOrder(order)
        toast.success(`Order #${order?.orderNumber} clicked!`);
    }
  return (
    <>
        <TableBody>
            <TooltipProvider>
                {orders?.map((order) => (
                    <Tooltip key={order?.orderNumber}>
                        <TooltipTrigger asChild>
                    <TableRow onClick={() => handleOrderClicked(order)} className="cursor-pointer hover:bg-gray-100 h-12">
                        <TableCell className="font-medium">...{order?.orderNumber?.slice(-10) ?? 'N/A'}</TableCell>
                        <TableCell className="hidden md:table-cell">{order?.orderDate && new Date(order?.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{order?.customerName}</TableCell>
                        <TableCell className="hidden md:table-cell">{order?.email}</TableCell>
                        <TableCell className="">
                            <PriceFormatter amount={order?.totalPrice} className="text-black font-medium" />
                        </TableCell>
                        <TableCell>{order?.status && <span className={`capitalize px-2 py-1 rounded-full text-xs font-semibold ${order?.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-800'}`}>{order?.status}</span>}</TableCell>
                    </TableRow>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="bg-black p-2 text-white rounded-full">Click to see order details</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </TableBody>
                <OrderDetailsDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
            {/* {selectedOrder && (
            ))} */}
    </>
  )
}
