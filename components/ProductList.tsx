import { Category, Product } from "@/sanity.types"
import Categories from "./Categories";
import ProductGrid from "./ProductGrid";

type Props ={
    products:Product[];
    categories?:Category[];
    title?:boolean;
}

export default function ProductList({products, title, categories}: Props) {
  return (
    <div className="pb-10">
        {/* categories */}
        {categories && <Categories categories={categories} />}
        {/* product */}
        {title && (
            <div className="pb-5">
            <h2 className="text-2xl font-semibold text-gray-600">
                Day of the <span className="text-lightBlue">Deal</span>
            </h2>
            <p className="text-sm text-gray-500 font-thin">
                Don&apos;t miss out on the day of the deal
            </p>
        </div>
        )}
        <ProductGrid products={products}/>
    </div>
  )
}
