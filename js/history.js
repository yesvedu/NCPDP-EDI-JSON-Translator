// js/history.js

// Check login
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

const historyTable = document.getElementById("historyTable");
const searchBox = document.getElementById("search");

// Load history
function loadHistory() {

    fetch("api/history.php")
    .then(response => response.json())
    .then(data => {

        historyTable.innerHTML = "";

        if (data.length === 0) {

            historyTable.innerHTML = `
                <tr>
                    <td colspan="4">No History Available</td>
                </tr>
            `;

            return;
        }

        data.forEach(item => {

            historyTable.innerHTML += `
                <tr>
                    <td>${item.filename}</td>
                    <td>${item.date}</td>
                    <td>${item.status}</td>
                    <td>
                        <button onclick="downloadJSON('${item.filename}')">
                            Download
                        </button>
                    </td>
                </tr>
            `;

        });

    })
    .catch(() => {

        historyTable.innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load history.
                </td>
            </tr>
        `;

    });

}

loadHistory();

// Search
searchBox.addEventListener("keyup", function () {

    const filter = searchBox.value.toLowerCase();

    const rows = historyTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const firstCell = rows[i].getElementsByTagName("td")[0];

        if (!firstCell) continue;

        if (firstCell.textContent.toLowerCase().includes(filter)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

});

// Download JSON
function downloadJSON(filename) {

    window.location.href =
        "uploads/" + filename.replace(".edi", ".json");

}