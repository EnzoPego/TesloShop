
'use client'

import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"


interface Props{
  slug: string
}

export const StockLabel = ({slug}:Props) => {

  const [stock , setStock] = useState(0)
  const [isLoading , setIsLoadin] = useState(true)

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
   const inStock = await getStockBySlug(slug);
   //console.log({inStock})
   setStock(inStock);
   setIsLoadin(false);
  };


  return (
    <>
      {
        isLoading
        ? 
        (<h1 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-300 animate-pulse`}>
          &nbsp;
        </h1>)
        :
        (<h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>)
      }
    </>
  )
}