const express = require("express");
const router = express.Router();

const db = require("../db");



// ==========================
// MENAMPILKAN SEMUA PESANAN
// ==========================

router.get("/", (req,res)=>{


    let status = req.query.status;


    let sql = `

    SELECT

    orders.id_order,

    orders.id_menu,

    menu.nama_menu,

    orders.jumlah,

    orders.total,

    orders.status


    FROM orders


    INNER JOIN menu

    ON orders.id_menu = menu.id_menu

    `;



    let data = [];


    if(status){


        sql += " WHERE orders.status=?";

        data.push(status);


    }



    db.query(
        sql,
        data,
        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json(result);


        }

    );


});






// ==========================
// TAMBAH PESANAN
// ==========================


router.post("/",(req,res)=>{


    const id_menu = Number(req.body.id_menu);

    const jumlah = Number(req.body.jumlah);



    console.log("Order masuk:");
    console.log(req.body);




    if(!id_menu || !jumlah){


        return res.json({

            message:"Data pesanan kosong"

        });


    }





    db.query(

        "SELECT harga FROM menu WHERE id_menu=?",


        [id_menu],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            if(result.length === 0){


                return res.json({

                    message:"Menu tidak ditemukan"

                });


            }




            const harga = result[0].harga;


            const total = harga * jumlah;




            db.query(

                `

                INSERT INTO orders
(id_menu,jumlah,total,status)

VALUES (?,?,?,'Pending')


                `,


                [

                    id_menu,

                    jumlah,

                    total

                ],



                (err,result)=>{


                    if(err){

                        console.log(err);


                        return res.status(500).json(err);

                    }



                    res.json({

                        message:"Pesanan berhasil disimpan",

                        id_order:result.insertId,

                        total:total


                    });



                }


            );



        }


    );



});




router.delete("/:id",(req,res)=>{


const id=req.params.id;



db.query(

"DELETE FROM orders WHERE id_order=?",

[id],


(err)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Pesanan berhasil dihapus"

});


}


);



});
router.put("/:id",(req,res)=>{


const id=req.params.id;

const status=req.body.status;



db.query(

`
UPDATE orders

SET status=?

WHERE id_order=?
`,

[
status,
id
],


(err)=>{


if(err){

return res.status(500).json(err);

}


res.json({

message:"Status berhasil diperbarui"

});


}


);



});
module.exports = router;