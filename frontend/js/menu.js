let daftarMenu = [];


async function loadMenu(){


    let response = await fetch(
        "http://localhost:3000/menu"
    );


    daftarMenu = await response.json();



    let makanan = "";
    let minuman = "";
    let appetizer = "";



    daftarMenu.forEach(menu=>{


        let card = `

        <div class="menu-card">


            <h3>
            ${menu.nama_menu}
            </h3>


            <p>
            Rp ${menu.harga.toLocaleString("id-ID")}
            </p>


            <button onclick="tambahMenu(${menu.id_menu})">

            Tambah

            </button>


        </div>

        `;



        if(menu.kategori=="Makanan"){

            makanan += card;

        }


        else if(menu.kategori=="Minuman"){

            minuman += card;

        }


        else if(menu.kategori=="Appetizer"){

            appetizer += card;

        }


    });



    document.getElementById("makananMenu").innerHTML = makanan;


    document.getElementById("minumanMenu").innerHTML = minuman;


    document.getElementById("appetizerMenu").innerHTML = appetizer;



}



function tambahMenu(id){


    let menu = daftarMenu.find(
        item => item.id_menu == id
    );


    tambahKeKeranjang(menu);


}


document.getElementById("logout")?.addEventListener("click", function(){

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    alert("Berhasil logout");

    window.location.href = "login.html";

});
function logout() {

    localStorage.removeItem("user");

    window.location = "login.html";

}
router.delete("/:id", (req,res)=>{

    let id=req.params.id;


    db.query(
        "DELETE FROM menu WHERE id_menu=?",
        [id],

        (err,result)=>{

            if(err)
            return res.json(err);


            res.json({
                message:"Menu deleted"
            });

        }
    );

});
