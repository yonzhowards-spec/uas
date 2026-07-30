const express = require("express");
const router = express.Router();

const db = require("../db");


// ======================
// GET MENU
// ======================

router.get("/", (req,res)=>{


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




// ======================
// TAMBAH MENU
// ======================

router.post("/",(req,res)=>{


    const {
        nama_menu,
        harga,
        kategori
    } = req.body;



    db.query(

        `
        INSERT INTO menu
        (nama_menu,harga,kategori)

        VALUES (?,?,?)
        `,

        [
            nama_menu,
            harga,
            kategori
        ],


        (err)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json({

                message:"Menu berhasil ditambahkan"

            });


        }


    );


});




// ======================
// UPDATE MENU
// ======================

router.put("/:id",(req,res)=>{


    const id=req.params.id;


    const {
        nama_menu,
        harga,
        kategori
    }=req.body;



    db.query(

        `
        UPDATE menu

        SET 
        nama_menu=?,
        harga=?,
        kategori=?

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

                message:"Menu berhasil diubah"

            });


        }

    );


});




// ======================
// DELETE MENU
// ======================

router.delete("/:id",(req,res)=>{


    const id=req.params.id;



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



module.exports=router;