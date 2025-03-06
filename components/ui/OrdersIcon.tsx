import { currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers";
import { ShoppingBasket } from "lucide-react";
import Icon from "../Icon";


export default async function OrdersIcon() {
  const user = await currentUser();
  let ordersCount = 0;
  
  if (user?.id) {
    const orders = await getMyOrders(user.id);
    ordersCount = orders?.length || 0;
  }

  return (
    <Icon
      icon={<ShoppingBasket />} 
      href="/orders" 
      text="Orders" 
      textUp="items" 
      order={true}
      ordersCount={ordersCount}
    />
  );
}
