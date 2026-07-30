async function login() {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    if (email == "" || password == "") {

        alert("Lengkapi data login");

        return;

    }

    const response = await fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if (!data.success) {

        alert(data.message);

        return;

    }

    localStorage.setItem("user", JSON.stringify(data));

    if (data.role == "manager") {

        window.location = "dashboard.html";

    } else {

        window.location = "index.html";

    }

}
document.getElementById("logout")?.addEventListener("click", function(){

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    alert("Berhasil logout");

    window.location.href = "login.html";

});