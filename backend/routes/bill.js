const express = require("express");
const router = express.Router();

const db = require("../db");



// tampil semua bill

router.get("/",(req,res)=>{


const sql=`

SELECT

orders.id_order,

orders.tanggal,

orders.total,

orders.status


FROM orders


ORDER BY orders.id_order DESC


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);



});


});





// lihat detail bill

router.get("/:id",(req,res)=>{


const id=req.params.id;



const sql=`

SELECT

menu.nama_menu,

order_detail.jumlah,

order_detail.subtotal


FROM order_detail


JOIN menu

ON order_detail.id_menu = menu.id_menu


WHERE order_detail.id_order=?


`;



db.query(sql,[id],(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});



});




module.exports=router;