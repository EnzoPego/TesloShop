
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


  const categoriesDB = await prisma.category.findMany()
  //console.log(categoriesDB)

  const categoriesMap = categoriesDB.reduce((map,category)=>{

    map [ category.name.toLowerCase()] = category.id

    return map
  },{} as Record<string,string>)

  //console.log(categoriesMap)

  // Productos
  products.forEach( async (product)=>{
    const { type,images, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    }) 

    // Images
    
    const imageData = images.map(image =>({
      url:image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imageData
    })

  })



  console.log('Seed ejecutado correctamente')
}




(() => {

    if(process.env.NODE_ENV === 'production') return        

    main()
})()