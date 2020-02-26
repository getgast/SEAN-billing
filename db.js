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
      console.log('createUserTable')
      pool.connect().then(client=>{
        console.log('conect')
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
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        status TEXT NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;
      console.log('createOrderTable')
      pool.connect().then(client=>{
        console.log('conect')
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

const createOrderItemTable = () =>{
  const queryText = 
  `CREATE TABLE IF NOT EXISTS 
      orderinoviceitem (
        id UUID PRIMARY KEY,
        product_name TEXT NOT NULL,
        order_id UUID NOT NULL,
        order_amount INT,
        created_date TIMESTAMP,
        status TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orderinovice (id) ON DELETE CASCADE
      )`;
      console.log('createOrderTable')
      pool.connect().then(client=>{
        console.log('conect')
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
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
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
 * Create All Tables
 */
const createAllTables = () => {
  console.log('hop')
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
  dropAllTables
};

require('make-runnable');