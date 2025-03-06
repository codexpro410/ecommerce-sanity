'use server';
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export type Metadata = {
    orderNumber:string,
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}
export type GroupedCartItems = {
    product:CartItem['product'];
    quantity:number
}
export async function createCheckoutSession(items:GroupedCartItems[],metadata:Metadata) {
    try {
        const itemsWithoutPrice = items.filter((item)=> !item.product.price);
        if(itemsWithoutPrice.length > 0){
            throw new Error('Some items do not have a price');
        }
        const customers =await stripe.customers.list({
            email:metadata.customerEmail,
            limit:1,
        });
        const customerId = customers.data.length > 0 ? customers.data[0].id : "";
        const sessionPAyload:Stripe.Checkout.SessionCreateParams = {
            metadata:{
                orderNumber:metadata.orderNumber,
                customerName:metadata.customerName,
                customerEmail:metadata.customerEmail,
                clerkUserId:metadata.clerkUserId
            },
            mode:"payment",
            allow_promotion_codes:true,
            payment_method_types:["card"],
            success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/cart?orderNumber=${metadata.orderNumber}`,
            line_items:items.map((item) => ({
                price_data: {
                    currency:"usd",
                    // unit_amount:Math.round(item.product.price as number * 100),
                    unit_amount:Math.round(item.product.price! * 100),
                    product_data: {
                        name:item.product.name || "UnnamedProduct",
                        description:item.product.description || "UnnamedProduct",
                        metadata:{ id: item.product._id},
                        images:item.product.image ? [urlFor(item.product.image).url()] : undefined,
                    },
                },
                quantity:item.quantity,
            })),
        }
        if(customerId){
            sessionPAyload.customer = customerId;
        }else{
            sessionPAyload.customer_email = metadata.customerEmail
        }
        const session = await stripe.checkout.sessions.create(sessionPAyload);
        return session.url;
    } catch (error) {
        console.log('error creating checkout session:',error)
        throw error;
    }
}