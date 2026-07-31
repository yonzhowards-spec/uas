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




// =================================================
//                 MENU CRUD
// =================================================



// GET SEMUA MENU

app.get("/menu",(req,res)=>{


    db.query(

        "SELECT * FROM menu",

        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json(result);


        }

    );


});




// GET MENU BERDASARKAN ID

app.get("/menu/:id",(req,res)=>{


    let id = req.params.id;


    db.query(

        "SELECT * FROM menu WHERE id_menu=?",

        [id],


        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json(result);


        }

    );


});





// TAMBAH MENU

app.post("/menu",(req,res)=>{


    const {
        nama_menu,
        harga,
        kategori
    } = req.body;



    if(
        !nama_menu ||
        !harga ||
        !kategori
    ){

        return res.status(400).json({

            message:"Data menu tidak boleh kosong"

        });

    }




    db.query(


        "INSERT INTO menu(nama_menu,harga,kategori) VALUES (?,?,?)",


        [
            nama_menu,
            harga,
            kategori
        ],



        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json({

                message:"Menu berhasil ditambahkan",

                id_menu:result.insertId

            });


        }



    );


});





// EDIT MENU

app.put("/menu/:id",(req,res)=>{


    let id=req.params.id;


    const {
        nama_menu,
        harga,
        kategori
    }=req.body;




    db.query(

        `
        UPDATE menu 
        SET nama_menu=?, harga=?, kategori=?
        WHERE id_menu=?
        `,


        [
            nama_menu,
            harga,
            kategori,
            id
        ],



        (err)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json({

                message:"Menu berhasil diperbarui"

            });


        }


    );


});





// HAPUS MENU

app.delete("/menu/:id",(req,res)=>{


    let id=req.params.id;



    db.query(

        "DELETE FROM menu WHERE id_menu=?",


        [id],


        (err)=>{


            if(err){

                return res.status(500).json(err);

            }



            res.json({

                message:"Menu berhasil dihapus"

            });


        }


    );


});
// =================================================
//                 ORDER
// =================================================




// POST ORDER / CHECKOUT


app.post("/orders",(req,res)=>{


    const {
        total,
        detail
    } = req.body;



    let status="Pending";



    if(!detail || detail.length == 0){


        return res.status(400).json({

            message:"Pesanan kosong"

        });


    }




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


                `
                INSERT INTO order_detail
                (id_order,id_menu,jumlah)
                VALUES ?
                `,


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







// GET SEMUA ORDER UNTUK DASHBOARD


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

        return res.status(500).json(err);

    }



    res.json(result);



}



);



});








// UPDATE STATUS ORDER


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

                return res.status(500).json(err);

            }



            res.json({

                message:"Status berhasil diubah"

            });


        }



    );



});









// DETAIL STRUK


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



WHERE order_detail.id_order=?

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
// =================================================
//                 LOGIN
// =================================================



app.post("/login",(req,res)=>{


    const {
        email,
        password
    } = req.body;




    if(
        !email ||
        !password
    ){

        return res.status(400).json({

            success:false,

            message:"Email dan password wajib diisi"

        });


    }




    db.query(


        "SELECT * FROM users WHERE email=? AND password=?",


        [
            email,
            password
        ],



        (err,result)=>{


            if(err){

                return res.status(500).json(err);

            }




            if(result.length == 0){


                return res.json({

                    success:false,

                    message:"Email atau password salah"

                });


            }




            let user=result[0];




            res.json({

                success:true,

                user:user

            });



        }



    );



});









// =================================================
//                 SERVER
// =================================================


// ======================
// PENJUALAN HARIAN
// ======================


app.get("/sales/today",(req,res)=>{


    db.query(

    `
    SELECT 
    COUNT(id_order) AS jumlah_order,
    SUM(total) AS pendapatan

    FROM orders

    WHERE DATE(tanggal)=CURDATE()
    `,


    (err,result)=>{


        if(err){

            return res.status(500).json(err);

        }


        res.json(result[0]);


    }


    );


});




// RIWAYAT PENJUALAN

app.get("/sales/history",(req,res)=>{


    db.query(

    `
    SELECT

    DATE(tanggal) AS tanggal,

    COUNT(id_order) AS jumlah_order,

    SUM(total) AS pendapatan


    FROM orders


    GROUP BY DATE(tanggal)


    ORDER BY tanggal DESC

    `,


    (err,result)=>{


        if(err){

            return res.status(500).json(err);

        }


        res.json(result);


    }


    );


});
// ======================
// PENDAPATAN HARI INI
// ======================


app.get("/sales/today",(req,res)=>{


    db.query(

    `
    SELECT

    COUNT(id_order) AS jumlah_order,

    IFNULL(SUM(total),0) AS pendapatan


    FROM orders


    WHERE DATE(tanggal)=CURDATE()

    `,


    (err,result)=>{


        if(err){

            return res.status(500).json(err);

        }


        res.json(result[0]);


    }


    );


});
app.listen(3000,()=>{


    console.log(

        "Server berjalan di http://localhost:3000"

    );


});