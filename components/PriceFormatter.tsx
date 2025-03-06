import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    amount:number | undefined,
    className?:string
}
export default function PriceFormatter({amount,className}: Props) {
    const formate = new Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  return (
    <span className={cn('text-sn font-semibold text-darkText', className)}>{formate}</span>
  )
}
