
import Image from "next/image";
import logo from "@/images/logo.png"
import Container from "./Container";
import Form from "next/form"
import Link from "next/link";
// import { ShoppingBag } from "lucide-react";
import Icon from "./Icon";
// import { currentUser } from "@clerk/nextjs/server";
import { AuthButtons } from "./ui/AuthButtons";
import { ShoppingBag } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import OrdersIcon from "./ui/OrdersIcon";



export default async function Header()  {
    // const user = await currentUser();
    // console.log(user)
    // let orders = null
    // if(user?.id){
        // let orders = await getMyOrders(user?.id);
    // }
      // orders part
//   const user = await currentUser();
//   // console.log(user)
//   let orders = null
//   if(user?.id){
//     orders = await getMyOrders(user?.id);
//   }
  return (
    <header className="w-full bg-white py-4 border-b border-b-gray-400 sticky top-0 z-50">
        <Container className="flex md:items-center justify-between gap-5 flex-col md:flex-row">
            <Link href={"/"}>
            <Image src={logo} alt="logo" width={96} className="w-24" priority/>
            </Link>
        {/* input */}
            <Form action="/search" className="flex-1">
                <input type="text" name="query" placeholder="Search for products..." className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-md focus-visible:border-darkBlue outline-none" />    
            </Form> 
        {/* taps */}
            <div className="flex flex-wrap items-center gap-5">
                {/* <Icon icon={<ShoppingBasket/>} href="/orders" textUp="items" text="Orders"/> */}
                <Icon icon={<ShoppingBag/>} href="/cart" textUp="items" text="Cart" cart/>
                <SignedIn>
                    <OrdersIcon />
                </SignedIn>
                <AuthButtons/>
            </div>
        </Container>
    </header>
  )
}
