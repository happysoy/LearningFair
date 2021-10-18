const mysql = require('mysql2'); 
const dotenv=require('dotenv');
const config=require('./config');
dotenv.config();

const db=mysql.createConnection(
    config[process.env.NODE_ENV || 'development']
);
db.connect((err)=>{
    if (err) throw err;
});
module.exports=db;