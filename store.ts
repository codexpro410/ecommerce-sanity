import { Product } from "./sanity.types";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    deleteCartProduct: (productId: string) => void;
    resetCart: () => void;
    getTotalPrice: () => number;
    getSubTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => CartItem[];
};

const userCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // ✅ Fixed: Correctly updating cart state
            addItem: (product) => set((state) => {
                const existingItem = state.items.find(item => item.product._id === product._id);

                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.product._id === product._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                } else {
                    return { items: [...state.items, { product, quantity: 1 }] };
                }
            }),

            // ✅ Fixed: Remove one quantity of an item
            removeItem: (productId) => set((state) => ({
                items: state.items.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 });
                        }
                    } else {
                        acc.push(item);
                    }
                    return acc;
                }, [] as CartItem[]),
            })),

            // ✅ Fixed: Delete product completely
            deleteCartProduct: (productId) => set((state) => ({
                items: state.items.filter(item => item.product._id !== productId),
            })),

            // ✅ Fixed: Reset the cart
            resetCart: () => set({ items: [] }),

            // ✅ Fixed: Get total price correctly
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
            },

            // ✅ Fixed: Get subtotal price with correct discount calculation
            getSubTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.product.price ?? 0;
                    const discount = ((item.product.discount ?? 0) * price) / 100;
                    const discountedPrice = price + discount; // Discount should be subtracted
                    return total + discountedPrice * item.quantity;
                }, 0);
            },

            // ✅ Fixed: Get count of a specific product
            getItemCount: (productId) => {
                const item = get().items.find(item => item.product._id === productId);
                return item ? item.quantity : 0;
            },

            // ✅ No need to modify, returns grouped items
            getGroupedItems: () => get().items,
        }),
        { name: "cart-store" }
    )
);

export default userCartStore;

// ((set, get) => ({
//     items: [],
//     addItem:(product: Product) => set((state) => ({
//         items: [...state.items, {product, quantity:1}]
//     })),
//     removeItem:(productId:string) => set((state) => ({
//         items: state.items.filter(item => item.product._id !== productId)
//     })),
//     deleteCartProduct:(productId:string) => set((state) => ({
//         items: state.items.filter(item => item.product._id !== productId)
//     })),
//     resetCart:() => set({items:[]}),
//     getTotalPrice:() => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
//     getSubTotalPrice:() => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
//     getItemCount:(productId:string) => get().items.filter(item => item.product._id === productId).length,
//     getGroupedItems:() => get().items.reduce((acc, item) => {
//         const existingItem = acc.find(i => i.product._id === item.product._id);
//         if (existingItem) {
//             existingItem.quantity += item.quantity;
//         } else {
//             acc.push(item);
//         }
//         return acc;
//     }, [] as CartItem[]),
//     })

