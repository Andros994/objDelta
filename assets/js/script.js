// Credenziali di esempio
const username = "kgb_admin";
const psw = "38fh_!?-7g1”##è";

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

