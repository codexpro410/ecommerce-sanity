import Container from "@/components/Container";
import ProductList from "@/components/ProductList";
import { getAllCategories, getProductByCategory } from "@/sanity/helpers";

type Props = {
  params: Promise<{slug:string}>
}

export default async function CategoriesPage({params}:Props) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const products = await getProductByCategory(slug);
  // console.log(products);
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Container className='p-8 bg-white rounded-lg shadow-md mt-3 w-full'>
        <h1 className="text-2xl md:text-3xl font-bold">
          Search results for
          <span className="text-darkBlue">{slug.split("-").map((word) => ` ${word.charAt(0).toUpperCase() + word.slice(1)}`)} </span>
          collection
          </h1>
        <ProductList products={products} categories={categories} title={false} />
        {/* <Categories categories={categories} /> */}
      </Container>
    </div>
  )
}
