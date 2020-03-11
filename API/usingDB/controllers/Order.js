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

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async addOrderItemList(req, res) {
    const createQuery = `INSERT INTO 
      orderinoviceitem(id, product_name, product_id, order_id, order_amount, created_date, status)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET order_amount = EXCLUDED.order_amount` ;

      const checkInsertArr = await req.body.orderItemList.map(item=>{
        console.log(item)
          let id = (item.id || uuid()),
              date = (item.date || moment(new Date()))
        const values = [     
            id,
            item.productName,
            item.productId,
            req.params.id,
            item.productWeight,
            date,
            'do edycji',
          ];
          try {
            const {rows} = db.query(createQuery, values);
            console.log(rows)
            return true;
          } catch (e) {
            return false;
          }
      })
      if(checkInsertArr.includes(false)) {
        return res.status(400).send([]);
      } else {
          console.log('gra')
        return res.status(201).send(checkInsertArr)
      }
  },
  async addSingleOrderItem(req,res){
    const createQuery = `INSERT INTO 
    orderinoviceitem(id, product_name, product_id, order_id, order_amount, created_date, status)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET order_amount = EXCLUDED.order_amount` ;

    console.log(req.body)
    let id = (req.body.id || uuid()),
    date = (req.body.date || moment(new Date()))
  const values = [     
      id,
      req.body.productName,
      req.body.productId,
      req.params.id,
      req.body.productWeight,
      date,
      'do edycji',
    ];
    console.log(values)
    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async getAllOrderedItems(req, res) {
    const findAllQuery = 'SELECT * FROM orderinoviceitem';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
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
    const text = 'SELECT * FROM orderinovice WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return rows[0];
    } catch(error) {
      console.log('nima')
    }
  },
  async getDetailedOrderItem(req,res) {
    const orderProduct = 'SELECT * FROM orderinoviceitem WHERE order_id = $1';
  
    try {
      const { rows } = await db.query(orderProduct, [req.params.id]);

      if (!rows[0]) {
        return []
      }
      return rows
    } catch(error) {
      return []
    }
  },
  async editableOrder(req,res) {
    const [order, orderChild] = await Promise.all([Order.getOne(req,res), Order.getDetailedOrderItem(req,res)]);
  
    const resultRes = {}
    resultRes.order = order
    resultRes.orderChild = orderChild
   try {
      return res.status(200).send(resultRes);
    } catch(e) {
      
    }
  },
  async editOrderItemInList(req, res) {
    const updateQuery = 'UPDATE orderinoviceitem SET order_amount=($1) WHERE id=($2) returning *';
    try {
      const { rows } = await db.query(updateQuery, [req.body.order_amount, req.body.id]);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async deleteOrderItemFromList(req, res) {
    const deleteQuery = 'DELETE FROM orderinoviceitem WHERE id=($1)'
    console.log(req.body)
    try {
      const { rows } = await db.query(deleteQuery, [req.body.id]);
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Order;