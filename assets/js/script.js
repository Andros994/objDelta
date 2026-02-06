// Credenziali di esempio
const username = "admin";
const psw = "1234";

$(document).ready(function () {

    $("#loginForm").on("submit", function (e) {
        e.preventDefault(); // evita il submit classico

        const inputUsername = $("#username").val();
        const inputPassword = $("#password").val();

        if (inputUsername === username && inputPassword === psw) {
            // Redirect alla pagina database.html
            window.location.href = "database.html";
        } else {
            alert("Username o password non corretti");
        }
    });

});
