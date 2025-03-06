import { cn } from '@/lib/utils'
import Currency from './PriceFormatter'

type Props = {
    price: number | undefined,
    discount: number | undefined,
    className?:string,
    label?:string,
}
export default function PriceView({ price, discount, className, label }: Props) {
  return (
    <div className='flex items-center justify-between gap-5'>
        <div className="flex items-center gap-2">
            <Currency amount={price } className={className}/>
            {price && discount && (
                <Currency amount={price + (discount * price) / 100} className={cn('text-xs font-medium line-through',className)} />
            )}
        </div>
        <p className='text-gray-500'>{label}</p>
    </div>
  )
}
