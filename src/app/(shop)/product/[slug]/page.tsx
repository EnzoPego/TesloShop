
export const revalidate = 604800// 7 dias

import { notFound } from 'next/navigation';

import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
//import { initialData } from '@/seed/seed';
import { getProductBySlug } from '../../../../actions/product/get-product-by-slug';


interface Props{
  params:{
    slug: string
  }
}

export default async function ProductBySlugPage({params}:Props) {

  const { slug } = params 
  const product = await getProductBySlug(slug)
  console.log(product)

  if(!product){
    notFound()
  }
  
  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      
      {/* Sliceshow */}
      <div className='col-span-1 md:col-span-2'>

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className='block md:hidden' 
         />


        {/* Desktop SlideShow */}
        <ProductSlideshow
        title={product.title}
        images={product.images}
        className='hidden md:block' 
        />


      </div>

      {/* Detalles */}
      <div className='col-span-1 px-5'>
        

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>

        <StockLabel slug={product.slug} />

        <p className='text-lg mb-5'>${product.price}</p>

        {/* Selector de talles */}
        <SizeSelector selectedSize={product.sizes[0]}
        availableSizes={product.sizes}/>

        {/* Selector de cantidad */}
        <QuantitySelector  quantity={2}/>


        {/* Boton */}
        <button className='btn btn-primary my-5'>
          Agregar al carrito
        </button>

        {/* Descripción */}

        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>
          {product.description}
        </p>
        
      </div>

    </div>
  );
}