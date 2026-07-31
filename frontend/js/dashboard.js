function cekManager(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    if(!user || user.role != "manager"){

        alert("Akses hanya untuk Manager");

        window.location.href = "index.html";

    }

}


cekManager();
const API_MENU = "http://localhost:3000/menu";


// ======================
// DASHBOARD ORDER
// ======================

async function tampilDashboard(){


    // Ambil data order untuk tabel

    let response = await fetch(
        "http://localhost:3000/orders"
    );


    let data = await response.json();



    let html = "";


    let pending = 0;



    data.forEach(order=>{


        if(order.status=="Pending"){
            pending++;
        }



        html += `

        <tr>

            <td>
            ${order.id_order}
            </td>


            <td>
            ${order.makanan}
            </td>


            <td>
            Rp ${order.total}
            </td>


            <td>
            ${order.status}
            </td>


        </tr>

        `;


    });




    document.getElementById(
        "dashboardData"
    ).innerHTML = html;



    document.getElementById(
        "jumlahOrder"
    ).innerHTML = data.length;



    document.getElementById(
        "pending"
    ).innerHTML = pending;



}




// ======================
// PENDAPATAN HARI INI
// ======================


async function tampilPendapatanHariIni(){


    let response = await fetch(
        "http://localhost:3000/sales/today"
    );


    let data = await response.json();



    document.getElementById(
        "pendapatan"
    ).innerHTML =
    "Rp " + Number(data.pendapatan).toLocaleString("id-ID");


}



// ======================
// RIWAYAT PENJUALAN
// ======================


async function tampilRiwayat(){


    let response = await fetch(
        "http://localhost:3000/sales/history"
    );


    let data = await response.json();



    let html="";



    data.forEach(item=>{


        html += `

        <tr>


        <td>

        ${
        new Date(item.tanggal)
        .toLocaleDateString("id-ID",{

            day:"2-digit",

            month:"long",

            year:"numeric"

        })
        }

        </td>



        <td>
        ${item.jumlah_order}
        </td>


<td>
Rp ${Number(item.pendapatan).toLocaleString("id-ID")}
</td>


        </tr>

        `;


    });



    document.getElementById(
        "historySales"
    ).innerHTML = html;



}






// ======================
// MENU MANAGER
// ======================


async function tampilMenuManager(){


    let response = await fetch(API_MENU);


    let data = await response.json();



    let html="";



    data.forEach(menu=>{


        html += `

        <tr>


        <td>
        ${menu.nama_menu}
        </td>


        <td>
        Rp ${menu.harga}
        </td>


        <td>
        ${menu.kategori}
        </td>



        <td>


        <button onclick="hapusMenu(${menu.id_menu})">

        Hapus

        </button>


        </td>


        </tr>


        `;


    });



    document.getElementById(
        "menuManager"
    ).innerHTML = html;



}






// ======================
// TAMBAH MENU
// ======================


async function tambahMenu(){


    let nama =
    document.getElementById("namaMenu").value;



    let harga =
    document.getElementById("hargaMenu").value;



    let kategori =
    document.getElementById("kategoriMenu").value;




    if(
        nama=="" ||
        harga==""
    ){

        alert("Data harus diisi");

        return;

    }





    await fetch(API_MENU,{

        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            nama_menu:nama,

            harga:harga,

            kategori:kategori

        })


    });




    alert("Menu berhasil ditambahkan");



    tampilMenuManager();



}






// ======================
// HAPUS MENU
// ======================


async function hapusMenu(id){


    let yakin = confirm(
        "Hapus menu ini?"
    );



    if(!yakin)
    return;




    await fetch(

        `${API_MENU}/${id}`,

        {

            method:"DELETE"

        }

    );



    tampilMenuManager();



}






// ======================
// LOGOUT
// ======================


function logout(){


    localStorage.clear();


    window.location.href =
    "login.html";


}






// ======================
// JALANKAN SEMUA
// ======================


tampilDashboard();

tampilPendapatanHariIni();

tampilRiwayat();

tampilMenuManager();