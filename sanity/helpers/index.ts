import { sanityFetch } from "../lib/live";
import { CATEGORIES_QUERY, MY_ORDERS_QUERY, PRODUCT_BY_CATEGORY_QUERY, PRODUCT_BY_SLUG, PRODUCT_SEARCH_QUERY, PRODUCTS_QUERY, SALE_QUERY } from "./queries";

export const getSale = async () => {
    try {
        const products = await sanityFetch({ 
            query: SALE_QUERY,
        });
        return products?.data || [];
    } catch (error) {
        console.error("error fetching sale data:", error)
        return []
    }
}
export const getAllProducts = async () => {
    try {
        const products = await sanityFetch({ 
            query: PRODUCTS_QUERY,
        });
        return products?.data || [];
    } catch (error) {
        console.error("All products fetching Error:", error)
        return []
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await sanityFetch({ 
            query: CATEGORIES_QUERY,
        });
        return categories?.data || [];
    } catch (error) {
        console.error("All Categories fetching Error:", error)
        return []
    }
}

export const getProductBySlug = async (slug:string) => {
    try {
        const product = await sanityFetch({ 
            query: PRODUCT_BY_SLUG,
            params: {
                slug,
            },
        });
        return product?.data || null;
    } catch (error) {
        console.error("products fetching Error:", error);
        return null;
    }
}

export const searchProductByName = async (searchParam:string) => {
    try {
        const products = await sanityFetch({ 
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam:searchParam,
            },
        });
        return products?.data || [];
    } catch (error) {
        console.error("fetching product by name Error:", error);
        return [];
    }
}

export const getProductByCategory = async (categorySlug:string) => {
    try {
        const products = await sanityFetch({ 
            query: PRODUCT_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },
        });
        return products?.data || [];
    } catch (error) {
        console.error("fetching product by category Error:", error);
        return [];
    }
}


export const getMyOrders = async (userId:string) => {
    if(!userId) {
        throw new Error("User ID is required")
    };
    try {
        const orders = await sanityFetch({ 
            query: MY_ORDERS_QUERY,
            params: {
                userId,
            },
        });
        return orders?.data || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}
