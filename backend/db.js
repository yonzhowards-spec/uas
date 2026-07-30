const mysql = require("mysql2");


const db = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"",

    database:"food_ordering"


});


db.connect((err)=>{


    if(err){

        console.log("Database gagal terhubung");

    }
    else{

        console.log("Database terhubung");

    }


});


module.exports = db;