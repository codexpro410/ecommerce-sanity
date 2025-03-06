import React from 'react'
import Container from './Container'
import Image from 'next/image'
import paymentMethods from "@/images/payment-methods.png"

export default function Footer() {
  return (
    <footer className='bg-lightBig text-sm'>
        <Container className='py-5 flex flex-wrap items-center justify-between'>
            <p className='text-gray-500 text-center'>CopyRight @ 2025 <span className='text-darkBlue font-semibold'>Ecommerce by Islam M. Abozeed, All rights reserved</span></p>
            <Image src={paymentMethods} alt="payment-methods" className='mx-auto lg:mx-0 w-64 object-cover'/>
        </Container>
    </footer>
  )
}
