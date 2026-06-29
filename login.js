// js/login.js

document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    error.innerHTML = "";

    if (username === "" || password === "") {
        error.innerHTML = "Please enter username and password.";
        return;
    }

    fetch("api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
            "username=" + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password)
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            // Save login status
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("username", username);

            // Go to translator page
            window.location.href = "translator.html";

        } else {

            error.innerHTML = data.message;

        }

    })
    .catch(() => {

        error.innerHTML = "Unable to connect to the server.";

    });

});