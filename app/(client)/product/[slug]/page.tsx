import AddToCartButton from '@/components/AddToCartButton';
import Container from '@/components/Container';
import PriceView from '@/components/PriceView';
import SinglePageIcons from '@/components/SinglePageIcons';
import SinglePageInfoSection from '@/components/SinglePageInfoSection';
import Stars from '@/components/Stars';
import { getProductBySlug } from '@/sanity/helpers';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export default async function SingleProductPage({params}:{params:Promise<{slug:string}>}) {
    const { slug } = await params
    const product = await getProductBySlug(slug);
    // console.log(slug)
    // console.log(product)
  return (
    <div>
      <Container className='flex flex-col md:flex-row gap-10 py-10'>
      {product?.image && 
        <div className="w-full md:w-1/2 h-auto border border-darkBlue/20 shadow-md rounded-md group overflow-hidden">
          <Image src={urlFor(product?.image).url()} alt="singlePage image" width={700} height={700} className='w-full max-h-[550px] object-cover group-hover:scale-110 rounded-md hoverEffect'  />
        </div>
      }
      <div className="w-full md:w1/2 flex flex-col gap-5">
          <div className="">
            <p className='text-4xl font-bold mb-2'>{product?.name}</p>
            <div className="flex items-center gap-2">
            <Stars/>
            
            
              <p className='text-sm font-medium text-gray-500'>{'(25 reviews)'}</p>
            </div>
          </div>
          <PriceView price={product?.price} discount={product?.discount} label={product?.label} />
          {product?.stock && 
            <p className='bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 rounded-lg'>in stock</p>
          }
          <p className='text-base text-gray-800'>
            <span className='bg-black text-white px-3 py-1 text-sm font-semibold rounded-md mr-2'>20</span> 
            People are viewing this right now
          </p>
          <p className='text-sm text-gray-600 tracking-wide'>{product?.description}</p>
          {product &&
            <AddToCartButton product={product}/>
          }
          <SinglePageIcons/>
          <SinglePageInfoSection/>
      </div>
      </Container>
    </div>
  )
}
