if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}


const filename = sessionStorage.getItem("uploadedFile");

const jsonFile = sessionStorage.getItem("jsonFile");

const validationData = sessionStorage.getItem("validation");


document.getElementById("filename").textContent =
    filename || "Unknown File";


// Validation check
const status = document.getElementById("status");


if(validationData){

    const validation = JSON.parse(validationData);


    if(validation.valid){

        status.style.color = "green";
        status.innerHTML = "✔ Valid ANSI X12 File";

    }
    else{

        status.style.color = "red";
        status.innerHTML = "❌ Invalid ANSI X12 File";

        const errorList = document.getElementById("errorList");


        validation.errors.forEach(function(error){

            const li=document.createElement("li");

            li.textContent=error;

            errorList.appendChild(li);

        });

    }

}
else{

    status.style.color="orange";
    status.innerHTML="Validation data not found";

}



// Load JSON file

if(jsonFile){

fetch("api/get_json.php?file=" + jsonFile)

.then(response => response.json())

.then(data => {

    document.getElementById("jsonOutput").textContent =
    JSON.stringify(data,null,4);

})

.catch(error=>{

    document.getElementById("jsonOutput").textContent =
    "JSON loading error";

});


}
else{

document.getElementById("jsonOutput").textContent =
"No JSON file found";

}


// Download JSON
document.getElementById("downloadBtn").addEventListener("click", function () {

    const jsonContent = document.getElementById("jsonOutput").textContent;

    const blob = new Blob(
        [jsonContent],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "translated_result.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});