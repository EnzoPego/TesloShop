


export const generatePaginaionNumbers = (currenPage:number, totalPages:number) => {

    // Si el número total de las páginas es 7 o menos, muestra todas las páginas sin puntos suspensivos
    
    if (totalPages <= 7) {
        return Array.from({length:totalPages}, (_,i) => i + 1) // [1,2,3,4,5,6,7]
    }

    // Si la página actiual esta entre las primeras 3 páginas 
    // mostrar las primeras 3, puntos suspensivos y las últimas 2

    if( currenPage <= 3){
        return [1,2,3,'...',totalPages -1 ,totalPages]  // [1,2,3,'...',49,50]
    }

    // Si la página actual esta entre las últimas 3 páginas
    // mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas

    if( currenPage >= totalPages -2){
        return [1,2,'...',totalPages-2,totalPages-1,totalPages ] 
    }

    // Si l página actual está en otro lugar medio
    //mostrar laprimera página , puntos suspensivos , lapagina actual y vecinos

    return[
        1,
        '...',
        currenPage -1, 
        currenPage,
        currenPage +1,
        '...',
        totalPages
    ]



}