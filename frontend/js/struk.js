async function loadStruk(){


    let params = new URLSearchParams(
        window.location.search
    );


    let id=params.get("id");



    // ambil data order

    let orderResponse = await fetch(
        "http://localhost:3000/orders"
    );


    let orders = await orderResponse.json();



    let order = orders.find(
        x=>x.id_order==id
    );





    // ambil detail makanan

    let detailResponse = await fetch(

        "http://localhost:3000/orders/"+id+"/detail"

    );


    let detail = await detailResponse.json();





    let list="";



    detail.forEach(item=>{


        list += `

        <p>
        - ${item.nama_menu}
        <br>

        &nbsp;&nbsp;Rp 
        ${(item.harga * item.jumlah).toLocaleString("id-ID")}

        </p>

        `;


    });





    document.getElementById("struk").innerHTML=`

    
    <p>
    ID Order : ${order.id_order}
    </p>


    <p>
    Tanggal :
    ${new Date(order.tanggal).toLocaleString("id-ID")}
    </p>


    <hr>


    <h3>
    Pesanan:
    </h3>


    ${list}



    <hr>


    <h3>

    Total :
    Rp ${order.total.toLocaleString("id-ID")}

    </h3>


    <p>

    Status :
    ${order.status}

    </p>


    `;



}



loadStruk();