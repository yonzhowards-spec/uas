async function loadOrders(){

    const response = await fetch(
        "http://localhost:3000/orders"
    );


    const orders = await response.json();


    let html = "";


    orders.forEach(order => {


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


            <td>

${
    order.status === "Pending"

    ?

    `<button onclick="selesai(${order.id_order})">
        Selesai
    </button>`

    :

    `Sudah selesai`

}


<button onclick="cetakStruk(${order.id_order})">

Cetak

</button>


</td>

        </tr>

        `;


    });



    document.getElementById("orderData").innerHTML = html;


}





async function selesai(id){


    console.log("Klik tombol selesai ID:", id);



    let response = await fetch(

        "http://localhost:3000/orders/"+id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                status:"Selesai"

            })


        }


    );



    let hasil = await response.json();



    console.log(hasil);



    alert("Status berhasil diubah");


    loadOrders();



}



loadOrders();
function cetakStruk(id){


    let order = prompt(
        "Masukkan ID Order:",
        id
    );


    window.open(

        "struk.html?id="+order,

        "_blank"

    );


}

function logout() {

    localStorage.removeItem("user");

    window.location = "login.html";

}