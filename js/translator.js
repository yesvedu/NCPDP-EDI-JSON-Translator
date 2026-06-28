// Check login
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

const fileInput = document.getElementById("ediFile");
const translateBtn = document.getElementById("translateBtn");
const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");

translateBtn.addEventListener("click", function () {

    message.innerHTML = "";

    if (fileInput.files.length === 0) {

        message.style.color = "red";
        message.innerHTML = "Please select an EDI file.";

        return;
    }

    const formData = new FormData();

    formData.append("ediFile", fileInput.files[0]);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "api/upload.php", true);

    progressBar.style.display = "block";

    xhr.upload.onprogress = function (e) {

        if (e.lengthComputable) {

            progressBar.value = Math.round(
                (e.loaded / e.total) * 100
            );

        }

    };

    xhr.onload = function () {

        if (xhr.status !== 200) {

            message.style.color = "red";
            message.innerHTML = "Server Error.";

            return;
        }

        const response = JSON.parse(xhr.responseText);

        if (!response.success) {

            message.style.color = "red";
            message.innerHTML = response.message;

            return;
        }

        // Save filename
        sessionStorage.setItem(
            "uploadedFile",
            response.filename
        );

        // Save parsed JSON
        sessionStorage.setItem(
            "jsonFile",
            response.jsonFile
        );

        // Save validation
        sessionStorage.setItem(
            "validation",
            JSON.stringify(response.validation)
        );

        window.location.href = "result.html";

    };

    xhr.send(formData);

});