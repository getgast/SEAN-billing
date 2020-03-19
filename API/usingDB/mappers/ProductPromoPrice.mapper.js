const ProductPromoPriceMapper = {
    async mapProductClient(dbResult) {
        console.log(dbResult)
        const mapRes = await dbResult.reduce((map, element)=>{
            if (!map[element.productid]) {
                map[element.productid] = [element]
              } else {
                map[element.productid].push(element)
              }
              return map;
        }, {})
        return mapRes;
    } 
}

export default ProductPromoPriceMapper;