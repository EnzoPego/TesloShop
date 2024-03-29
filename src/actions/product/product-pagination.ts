
'use server'

import prisma from "@/lib/prisma"


interface PaginationOptions {
    page?: number
    take?: number
}

export const getPaginatedProductsWithImages = async ({page = 1, take = 12}:PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    
 
    try {
         // 1. Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: ( page -1 ) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    } 
                }
            }
        })
        
        //console.log(products)

        return {
            currentPage:1,
            totalPages:10,
            products: products.map(product =>({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
        
    } catch (error) {

        throw new Error ('no se pudo cargar los productos')        
    }

}