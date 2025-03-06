'use client';
import { Category } from '@/sanity.types'
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { Popover, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react'
import { PopoverContent } from '@radix-ui/react-popover';
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup, CommandItem } from './ui/command';
import { cn } from '@/lib/utils';
type Props = {
    categories:Category[]
}
export default function CategorySelector({categories}:Props) {
    const [open,setOpen] = useState(false)
    const [value,setValue] = useState<string | null>(null)
    const router = useRouter()

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant={'outline'} role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {value ? categories.find((category)=> category?._id === value)?.title : "Filter by Category"}
                <ChevronsUpDown/>
                </Button>
        </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0 z-10'>
        <Command>
            <CommandInput placeholder="Search category..." className='h-9'
             onKeyDown={(e) => {
              if (e.key !== "Enter"){
                const selectedCategory = categories.find((c) =>
                c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
              );
              // do this
              if(selectedCategory?.slug?.current){
              setValue(selectedCategory?._id);
              router.push(`/categories/${selectedCategory?.slug?.current}`);
              setOpen(false);
            }
            }
              }}/>
              <CommandList>
                  <CommandEmpty>No Category found</CommandEmpty>
                  <CommandGroup>{categories?.map((category)=>(
                      <CommandItem key={category?._id} value={category?.title} 
                      onSelect={()=>
                        {
                        setValue(value === category?._id ? category?._id :'' );
                        router.push(`/categories/${category?.slug?.current}`);
                        setOpen(false);
                        }}>
                          {category.title}
                          <Check className={cn(value === category?._id ? 'opacity-100' : 'opacity-0')}/>
                      </CommandItem>
                  ))}
                  </CommandGroup>
              </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
