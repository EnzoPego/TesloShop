
export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import {  redirect } from "next/navigation";
//const seedProducts = initialData.products


interface Props {
  params:{
    gender:string
  },
  searchParams:{
    page?:string
  }
}

interface PaginationOptions {
  page?: number
  take?: number
}

export default async function GenderByPage({ searchParams,params }:Props) {

  const { gender } = params

  
  const page = searchParams.page ? parseInt( searchParams.page ) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender:gender as Gender
  })
  //console.log(products)
  

  if ( products.length === 0 ) {
    redirect(`/gender/${gender}`)
  }


  
  const labels:Record <string,string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid':'para Niños',
    'unisex': 'Para Todos'
  }

  // if (id === 'kids'){
  //   notFound()
  // }

  return (
    <>
      <Title
        title={`Artilulos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
      
    </>
  );
}