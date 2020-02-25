import moment from 'moment';
import { uuid } from 'uuidv4';
import db from '../db';


const Order = {
 /**
   * Create A Order
   * @param {object} req 
   * @param {object} res
   * @returns {object} Order  object 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO 
      orderinovice(id, title, owner_id, created_date, status)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

      console.log(req.body)
    const values = [
      uuid(),
      req.body.title,
      '3b50a8cc-106d-4286-9af5-cdc30d3f3b61',
      moment(new Date()),
      'do edycji',
    ];
    console.log(req.body)

    console.log('query')
    console.log(createQuery)
    console.log('value')
    console.log(values)

    try {
      const { rows } = await db.query(createQuery, values);
      console.log(rows)
      return res.status(201).send(rows[0]);
    } catch(error) {
      console.log('blad')
      return res.status(400).send(error);
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM orderinovice where owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, ['3b50a8cc-106d-4286-9af5-cdc30d3f3b61']);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async getOne(req, res) {
    const text = 'SELECT * FROM orderinovice WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, '3b50a8cc-106d-4286-9af5-cdc30d3f3b61']);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
}

export default Order;