async function tampilDashboard(){


let response=await fetch(
"http://localhost:3000/orders"
);


let data=await response.json();



document.getElementById("jumlahOrder").innerHTML=data.length;



let total=0;


data.forEach(x=>{

total+=Number(x.total);

});



document.getElementById("pendapatan").innerHTML=
"Rp "+total;



let pending=data.filter(
x=>x.status=="Pending"
).length;



document.getElementById("pending").innerHTML=pending;



}



tampilDashboard();

function logout(){

    console.log("Tombol logout ditekan");

    localStorage.clear();

    window.location.href = "login.html";

}