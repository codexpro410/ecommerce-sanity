import React from "react";
import { Palette, HelpCircle, Truck, Share2 } from "lucide-react";

const iconsArray = [
  { id: 1, icon: <Palette />, label: "Compare color" },
  { id: 2, icon: <HelpCircle />, label: "Ask a question" },
  { id: 3, icon: <Truck />, label: "Delivery & Return" },
  { id: 4, icon: <Share2 />, label: "Share" },
];

export default function SinglePageIcons() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-2 -mt-2 text-lg ">
      {iconsArray.map((item) => (
        <div key={item.id}
          className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
