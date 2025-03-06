// 'use client'
// https://www.youtube.com/watch?v=-jAFgxRJ2IQ
// Build an E-Commerce App with Next.js 15 | Full-Stack Tutorial: Sanity, Clerk, Stripe | Part 5
// last part
// https://www.youtube.com/watch?v=fl9qqvkW3n8
// https://github.com/noorjsdivs/ecommerce-app-yt-1
import Container from "@/components/Container";
import DiscountBanner from "@/components/DiscountBanner";
import ProductList from "@/components/ProductList";
import { getAllCategories, getAllProducts, getSale } from "@/sanity/helpers";

export default async function Home() {
  const sales = await getSale();
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log(sales);
  // console.log(products);
  // console.log("categories", categories);
  return (
    <div>
      <Container>
      <DiscountBanner sales={sales} />
      <ProductList products={products} title={true} categories={categories}/>
      </Container>
    </div>
  );
}
