
import { initialData } from "./seed"
import prisma from '../lib/prisma';





const main = async () => {
 //console.log(initialData)

 // Borrar registros previos
 await prisma.productImage.deleteMany()
 await prisma.product.deleteMany()
 await prisma.category.deleteMany()

 const {categories, products} = initialData


 // Categorias

  const categoriesData = categories.map( category =>({
    name:category
  }))
  //console.log(categoriesData)

  await prisma.category.createMany({
    data: categoriesData
  })


 


    console.log('Seed ejecutado correctamente')
}




(() => {

    if(process.env.NODE_ENV === 'production') return        

    main()
})()