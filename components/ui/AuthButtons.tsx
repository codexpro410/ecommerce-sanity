'use client';

import { User } from "lucide-react";
import { ClerkLoaded, SignInButton, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/clerk-react";
import Icon from "../Icon";
// import OrdersIcon from "./OrdersIcon";

export function AuthButtons() {
  const { user } = useUser();
  
  return (
    <ClerkLoaded>
      {user ? (
        <div className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect'>
          <UserButton/>
          <div className="hidden md:inline-flex flex-col">
            <p className="text-xs">Welcome Back</p>
            <p className="font-semibold">{user?.firstName}{user?.lastName ? <span> {user.lastName}</span> : null}</p>
          </div>
        </div>
      ) : (
        <SignInButton mode="modal">
          <div>
            <Icon 
              icon={<User />}  
              textUp="Account" 
              text="Login"
            />
          </div>
        </SignInButton>
      )}
    </ClerkLoaded>
  );
}


// 'use client'

// import { ShoppingBasket, User, ShoppingBag } from "lucide-react";
// import { ClerkLoaded, SignedIn, SignInButton, useUser } from "@clerk/nextjs";
// import { UserButton } from "@clerk/clerk-react";
// import Icon from "../Icon";
// import { useEffect, useState } from "react";

// type  Props = {
//   user: UserProps | null;
// }
// type UserProps = {
//   firstName: string;
// }
// //  i made this separate component to avoid 'use client' in header component
// // export function AuthButtons({ user }: Props) {
// export function AuthButtons() {
//   const { user } = useUser();
//   // console.log(user)
//   // const [isClient, setIsClient] = useState(false);
//   // useEffect(() => {
//   //   setIsClient(true);
//   // }, []);
//   // if(!isClient) return null;
  
//   return (
//     <ClerkLoaded>
//       <SignedIn>
//       <Icon icon={<ShoppingBasket/>} href="/orders" textUp="items" text="Orders" order/>
//       </SignedIn>

//       {user ? (
//         <div className='flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect'>
//           <UserButton/>
//           <div className="hidden md:inline-flex flex-col">
//             <p className="text-xs">Welcome Back</p>
//             <p className="font-semibold">{user?.firstName} <span>{user?.lastName}</span></p>
//           </div>

//         </div>
//       ) : (
//         <SignInButton mode="modal">
//           <div>
//             <Icon 
//               icon={<User className="text-dark"/>}  
//               textUp="Account" 
//               text="Login"
//             />
//           </div>
//         </SignInButton>
//       )}
//     </ClerkLoaded>
//   );
// }