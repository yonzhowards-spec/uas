let menuList = [];

let cart = [];




// =======================
// LOAD MENU
// =======================

async function loadMenu(){


    let response = await fetch(
        "http://localhost:3000/menu"
    );


    menuList = await response.json();



    let makanan = "";
    let minuman = "";
    let appetizer = "";



    menuList.forEach(menu=>{


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






// =======================
// TAMBAH MENU
// =======================


function tambahMenu(id){


    let menu = menuList.find(

        item=>item.id_menu==id

    );


    tambahKeKeranjang(menu);


}






// =======================
// KERANJANG
// =======================


function tambahKeKeranjang(menu){


    let item = cart.find(

        x=>x.id_menu==menu.id_menu

    );



    if(item){


        item.jumlah++;


    }

    else{


        cart.push({

            id_menu:menu.id_menu,

            nama_menu:menu.nama_menu,

            harga:menu.harga,

            jumlah:1

        });


    }



    tampilKeranjang();


}







function tampilKeranjang(){


    let html="";

    let total=0;



    cart.forEach((item,index)=>{

    let subtotal = item.harga * item.jumlah;

    total += subtotal;

    html += `
    <tr>

        <td>${item.nama_menu}</td>

        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>

        <td>

            <button class="qty-btn" onclick="kurangJumlah(${index})">-</button>

            <span class="qty-number">${item.jumlah}</span>

            <button class="qty-btn" onclick="tambahJumlah(${index})">+</button>

        </td>

        <td>Rp ${subtotal.toLocaleString("id-ID")}</td>

        <td>

            <button onclick="hapusItem(${index})">
                Hapus
            </button>

        </td>

    </tr>
    `;
});


    document.getElementById("cartData").innerHTML = html;



    document.getElementById("cartTotal").innerHTML =

    "Rp " + total.toLocaleString("id-ID");



}







function hapusItem(index){


    cart.splice(index,1);


    tampilKeranjang();


}
function tambahJumlah(index){

    cart[index].jumlah++;

    tampilKeranjang();

}

function kurangJumlah(index){

    if(cart[index].jumlah > 1){

        cart[index].jumlah--;

    }else{

        cart.splice(index,1);

    }

    tampilKeranjang();

}







// =======================
// CHECKOUT
// =======================


async function checkout(){



    if(cart.length===0){


        alert("Keranjang masih kosong");


        return;


    }




    let total=0;



    cart.forEach(item=>{


        total += item.harga * item.jumlah;


    });





    let data = {


        total:total,


        detail:cart


    };






    try{


        let response = await fetch(

            "http://localhost:3000/orders",

            {


                method:"POST",


                headers:{


                    "Content-Type":"application/json"


                },


                body:JSON.stringify(data)


            }


        );





        let result = await response.json();



        console.log(result);



        alert("Pesanan berhasil dibuat");



        cart=[];



        tampilKeranjang();



    }


    catch(error){


        console.log(error);


        alert("Gagal mengirim pesanan");


    }


function logout() {

    localStorage.removeItem("user");

    window.location = "login.html";

}
}
loadMenu();