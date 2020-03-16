// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Reflection Table
 */
const createReflectionTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS 
      reflections (
        id UUID PRIMARY KEY,
        success TEXT NOT NULL,
        low_point TEXT NOT NULL,
        take_away TEXT NOT NULL,
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

      pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
}

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS 
      users (
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
      pool.connect().then(client=>{
        client.query(queryText)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
      })
}

// create Order db

const createOrderTable = () => {
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      orderinovice (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        client_id UUID,
        owner_id UUID NOT NULL,
        order_number SERIAL,
        created_date TIMESTAMP,
        status TEXT NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
      )`;

      pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
}

const createOrderItemTable = () =>{
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      orderinoviceitem (
        id UUID PRIMARY KEY,
        product_name TEXT NOT NULL,
        product_id UUID NOT NULL,
        order_id UUID NOT NULL,
        client_id UUID,
        order_amount INT,
        order_sum INT,
        created_date TIMESTAMP,
        status TEXT NOT NULL,
        comment TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orderinovice (id) ON DELETE CASCADE,
        FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
      )`;
   
       pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
}

const createClientTable = ()=>{
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      clients (
        id UUID PRIMARY KEY,
        client_name TEXT NOT NULL,
        client_address TEXT NOT NULL,
        client_number TEXT NOT NULL,
        client_hashed_id UUID NOT NULL
      )`;

      console.log('createClientTable')
      pool.connect().then(client=>{
        client.query(queryText)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
      })
}

const createProductAndDefaultPriceTable = () =>{
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      default_product_price (
        id SERIAL,
        product_id UUID NOT NULL, 
        product_name TEXT NOT NULL,
        product_default_price INT NOT NULL,
        PRIMARY KEY (id)
      )`;

      pool.connect().then(client=>{
        client.query(queryText)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
      })
}

const createProductAndPriceTable = () =>{
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      product_price_client (
        ClientID UUID NOT NULL,
        ProductID INT NOT NULL,
        ClientPrice INT NOT NULL,
        FOREIGN KEY (ClientID) REFERENCES clients(id),
        FOREIGN KEY (ProductID) REFERENCES default_product_price(id)
      )`;
        console.log('createProductAndPriceTable')
        pool.connect().then(client=>{
          client.query(queryText)
          .then((res) => {
            console.log(res);
            pool.end();
          })
          .catch((err) => {
            console.log(err);
            pool.end();
          });
        })
}

/**
 * Drop Reflection Table
 */
const dropReflectionTable = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Drop User Table
 */
const dropProductPrice = () => {
  const queryText = 'DROP TABLE IF EXISTS product_price_client';
  console.log('dropProductPrice')
  pool.connect().then(client=>{
    client.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  })
}

const dropdefault_product_price = () =>{
  const queryText = 'DROP TABLE IF EXISTS default_product_price';
  pool.connect().then(client=>{
    client.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  })
}


const drop_invoiceitem = () =>{
  const queryText = 'DROP TABLE IF EXISTS orderinoviceitem';
  pool.connect().then(client=>{
    client.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  })
}

const drop_invoice = () =>{
  const queryText = 'DROP TABLE IF EXISTS orderinovice';
  pool.connect().then(client=>{
    client.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  })
}

/**
 * Create All Tables
 */
const createAllTables = () => {
  console.log('hop')
  createProductAndPriceTable();
  createProductAndDefaultPriceTable();
  createClientTable();
  createOrderTable();
  createUserTable();
  createReflectionTable();
  createOrderItemTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  console.log('drop')
  dropUserTable();
  dropReflectionTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createAllTables,
  createOrderTable,
  dropAllTables,
  createProductAndPriceTable,
  dropProductPrice,
  dropdefault_product_price,
  createProductAndDefaultPriceTable,
  drop_invoiceitem,
  createOrderItemTable,
  drop_invoice 
};

require('make-runnable');