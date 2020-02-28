import { uuid } from 'uuidv4';
import db from '../db';

const ProductWithDefaultPrice = {
    async create(req, res) {
        const createQuery = `INSERT INTO 
          default_product_price (product_name, product_default_price)
          VALUES($1, $2)
          returning *`;
    
          console.log(req.body)
        const values = [
          req.body.productName,
          req.body.productPrice
        ];
    
        try {
          const { rows } = await db.query(createQuery, values);
          console.log(rows)
          return res.status(201).send(rows[0]);
        } catch(error) {
          return res.status(400).send(error);
        }
      },
       async getAllProduct(req, res) {
        const findAllQuery = 'SELECT * FROM  product_price_client';
        try {
          const { rows, rowCount } = await db.query(findAllQuery);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }
      },
      async getProductList(req, res) {
        const findAllQuery = 'SELECT * FROM  default_product_price';
        try {
          const { rows, rowCount } = await db.query(findAllQuery);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }
      },
}

export default ProductWithDefaultPrice;

