const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testapp5',
    password: 'postgres',
    port: 5432,
  })


  const createDataBase = ()=>{
    pool.query("CREATE DATABASE testApp5", (err, res) => {
        console.log(err, res);

        if(!err) {
            pool.query("CREATE TABLE listaPierwsza", (err, res) => {
                console.log('-----------error')
                console.log(err);
                console.log('-----------koniec- error')
                console.log( res);
                pool.end();
            });
        }
    });
}

const createTable = ()=>{
    pool.query("CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255));", (err, res)=>{
        console.log('-----------error')
        console.log(err);
        console.log('-----------koniec- error')
        console.log( res);
        pool.end();
    })
}

const addElem = ()=>{
    pool.query('INSERT INTO Persons (PersonID, LastName, FirstName, Address, City) VALUES ($1, $2, $3, $4, $5);', [1, "dwa", "trzy", "cztery", "piec"], (err, res)=>{
        console.log('-----------error')
        console.log(err);
        console.log('-----------koniec- error')
        console.log( res);
        
    })
}

module.exports = {
    createDataBase,
    createTable,
    addElem
}
  