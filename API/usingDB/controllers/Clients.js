import moment from 'moment';
import { uuid } from 'uuidv4';
import db from '../db';

const Clients = {
    /**
      * Create A Order
      * @param {object} req 
      * @param {object} res
      * @returns {object} Order  object 
      */
     async create(req, res) {
       const createQuery = `INSERT INTO 
         clients (id, client_name, client_address, client_number, client_hashed_id)
         VALUES($1, $2, $3, $4, $5)
         returning *`;
   
         console.log(req.body)
       const values = [
         uuid(),
         req.body.clientName,
         req.body.clientAddress,
         req.body.clientPhone,
         uuid()
       ];
   
       try {
         const { rows } = await db.query(createQuery, values);
         console.log(rows)
         return res.status(201).send(rows[0]);
       } catch(error) {
         return res.status(400).send(error);
       }
     },
     async getAllClients(req, res) {
        const findAllQuery = 'SELECT * FROM clients';
        try {
          const { rows, rowCount } = await db.query(findAllQuery);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }
      },
      async getClientPromoPrice(req, res) {
        const findAllQuery = 'SELECT * FROM product_price_client WHERE clientid = $1';
        console.log(req.params)
        //console.log(req.body)
        try {
          const { rows, rowCount } = await db.query(findAllQuery, [req.params.id]);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }
      }
    }

    export default Clients;