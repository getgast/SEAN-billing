import { uuid } from 'uuidv4';
import db from '../db';

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
        }
}

export default ProductPromoPrice;

