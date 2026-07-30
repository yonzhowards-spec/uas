const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());





// ======================
// DATABASE
// ======================


const db = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"",

    database:"food_ordering"

});





db.connect((err)=>{


    if(err){

        console.log("Database gagal konek");

        console.log(err);

    }

    else{

        console.log("Database berhasil konek");

    }


});







// ======================
// GET MENU
// ======================


app.get("/menu",(req,res)=>{


    db.query(

        "SELECT * FROM menu",

        (err,result)=>{


            if(err){

                res.status(500).json(err);

            }

            else{

                res.json(result);

            }


        }

    );


});









// ======================
// POST ORDER / CHECKOUT
// ======================


app.post("/orders",(req,res)=>{


    const {total,detail}=req.body;



    let status="Pending";




    db.query(

        "INSERT INTO orders(total,status) VALUES (?,?)",

        [
            total,
            status
        ],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            let id_order=result.insertId;



            let values=[];



            detail.forEach(item=>{


                values.push([

                    id_order,

                    item.id_menu,

                    item.jumlah

                ]);


            });





            db.query(

                "INSERT INTO order_detail(id_order,id_menu,jumlah) VALUES ?",

                [values],


                (err2)=>{


                    if(err2){

                        return res.status(500).json(err2);

                    }



                    res.json({

                        message:"Order berhasil",

                        id_order:id_order

                    });



                }


            );



        }


    );


});








// ======================
// GET ORDER
// ======================


app.get("/orders",(req,res)=>{


db.query(


`

SELECT 

orders.id_order,

orders.total,

orders.status,

orders.tanggal,


GROUP_CONCAT(menu.nama_menu) AS makanan


FROM orders


JOIN order_detail

ON orders.id_order = order_detail.id_order


JOIN menu

ON order_detail.id_menu = menu.id_menu


GROUP BY orders.id_order


ORDER BY orders.id_order DESC


`,



(err,result)=>{


if(err){

res.status(500).json(err);


}

else{


res.json(result);


}



}



);



});







// ======================
// UPDATE STATUS
// ======================


app.put("/orders/:id",(req,res)=>{


let id=req.params.id;


let status=req.body.status;



db.query(

"UPDATE orders SET status=? WHERE id_order=?",

[
status,
id
],


(err)=>{


if(err){

res.status(500).json(err);

}

else{

res.json({

message:"Status berhasil diubah"

});


}


}



);


});


// ======================
// DETAIL STRUK ORDER
// ======================

app.get("/orders/:id/detail",(req,res)=>{


    let id=req.params.id;



    db.query(

    `

    SELECT 

    menu.nama_menu,
    menu.harga,
    order_detail.jumlah


    FROM order_detail


    JOIN menu

    ON order_detail.id_menu = menu.id_menu


    WHERE order_detail.id_order = ?


    `,


    [id],


    (err,result)=>{


        if(err){

            return res.status(500).json(err);

        }



        res.json(result);


    }



    );



});
// ======================
// LOGIN
// ======================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length == 0) {
                return res.json({
                    success: false,
                    message: "Email atau Password salah"
                });
            }

            const user = result[0];

            res.json({
                success: true,
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role
            });

        }
    );

});
app.listen(3000,()=>{


console.log(
"Server berjalan di http://localhost:3000"
);


});