import { uuid } from 'uuidv4';
import db from '../db';
import ProductPromoPriceMapper from './../mappers/ProductPromoPrice.mapper'

const ProductPromoPrice = {
    async addPromoPrice(req, res) {
        const createQuery = `INSERT INTO 
          product_price_client (ClientID, ProductID, ClientPrice)
          VALUES($1, $2, $3)
          returning *`;

          const checkInsertArr = await req.body.productWithPromoPrice.map(item=>{
            const values = [
                req.body.clientId,
                item.productId,
                item.productPrice
              ];

              try {
                const {rows} = db.query(createQuery, values);
                console.log(rows)
                return true;
              } catch (e) {
                return false;
              }
            
          })

          console.log(checkInsertArr)
          if(checkInsertArr.includes(false)) {
            return res.status(400).send([]);
          } else {
              console.log('gra')
            return res.status(201).send(checkInsertArr)
          }
        },
        async getClientsPromoProductList(req, res) {
          const findAllQuery = 'SELECT * FROM  product_price_client';
          try {
            const { rows, rowCount } = await db.query(findAllQuery);
            const map = await ProductPromoPriceMapper.mapProductClient(rows);

            return res.status(200).send(map);
          } catch(error) {
            return res.status(400).send(error);
          }
        },
}

export default ProductPromoPrice;

