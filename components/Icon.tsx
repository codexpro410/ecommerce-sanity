'use client';

import userCartStore from '@/store';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react';

interface IconProps {
  icon: ReactElement<{ className?: string }>;
  href?: string;
  text?: string;
  textUp?: string;
  counter?: number;
  cart?: boolean;
  order?: boolean;
  ordersCount?: number;
}

export default function Icon({ 
  icon, 
  href = '/', 
  text, 
  counter, 
  textUp, 
  cart, 
  order, 
  ordersCount = 0 
}: IconProps) {
  const [isClient, setIsClient] = useState(false);
  const { getGroupedItems } = userCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Determine the count to display
  let displayCount = counter;
  
  if (cart && isClient) {
    displayCount = getGroupedItems().length;
  } else if (order) {
    displayCount = ordersCount;
  }

  return (
    <Link href={href} className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect'>
      {React.cloneElement(icon, { className: `text-darkBlue w-5 h-5 md:w-6 md:h-6 ` })}
      <div className="flex flex-col">
        <p className='text-xs'>
          <span className='font-semibold'>
            {displayCount} {textUp}
          </span>
        </p>
        <p className='font-semibold'>{text}</p>
      </div>
    </Link>
  );
}
// 'use client';

// import userCartStore from '@/store';
// import Link from 'next/link';
// import React, { ReactElement, useEffect, useState } from 'react';

// interface IconProps {
//   icon: ReactElement<{ className?: string }>;
//   href?: string;
//   text?: string;
//   textUp?: string;
//   counter?: number;
//   cart?: boolean;
//   ordersCount?: number;
// }

// export default function Icon({ icon, href = '/', text, counter, textUp, cart, ordersCount = 0 }: IconProps) {
//   const [isClient, setIsClient] = useState(false);
//   const { getGroupedItems } = userCartStore();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   return (
//     <Link href={href} className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect'>
//       {React.cloneElement(icon, { className: `text-darkBlue w-5 h-5 md:w-6 md:h-6 ` })}
//       <div className="flex flex-col">
//         <p className='text-xs'>
//           <span className='font-semibold'>
//             {cart ? getGroupedItems().length : ordersCount || counter} {textUp}
//           </span>
//         </p>
//         <p className='font-semibold'>{text}</p>
//       </div>
//     </Link>
//   );
// }