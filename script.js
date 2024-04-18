const fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = "circle"; // Startspieler festlegen

function render() {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const table = document.createElement("table");
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            const index = i * 3 + j;
            cell.onclick = function() {
                if (!fields[index]) { // Wenn das Feld leer ist
                    fields[index] = currentPlayer; // Feld mit aktuellem Spieler markieren
                    render(); // Neu rendern, um die Änderung anzuzeigen
                    checkWinner(); // Checken ob jemand gewonnen hat
                    currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsle den Spieler
                    cell.onclick = null; // Entferne das onclick-Event, um zu verhindern, dass das Feld erneut angeklickt wird
                }
            };
            if (fields[index] === "circle") {
                cell.innerHTML = generateAnimatedCircleSVG();
            } else if (fields[index] === "cross") {
                cell.innerHTML = generateAnimatedCrossSVG();
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

function generateAnimatedCircleSVG() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="white" stroke="white" stroke-width="3">
                <animate attributeName="fill" values="none;white" dur="125ms" repeatCount="1" />
            </circle>
        </svg>
    `;
    return svgCode;
}


function generateAnimatedCrossSVG() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="black" stroke-width="6">
                <animate attributeName="opacity" values="0;1" dur="500ms" repeatCount="1" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="black" stroke-width="6">
                <animate attributeName="opacity" values="0;1" dur="500ms" repeatCount="1" />
            </line>
        </svg>
    `;
    return svgCode;
}

function resetGame() {
    // Alle Felder zurücksetzen
    fields.fill(null);

    // Alle Zellen leeren und wieder anklickbar machen
    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.onclick = function() {
            const index = Array.from(cell.parentNode.children).indexOf(cell);
            if (!fields[index]) {
                fields[index] = currentPlayer;
                render();
                currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
                cell.onclick = null;
            }
        };
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Wenn drei Felder in einer Gewinnkonstellation vom selben Spieler belegt sind
            alert(`Spieler "${fields[a].toUpperCase()}" hat gewonnen!`);
            resetGame(); // Spiel zurücksetzen
            return;
        }
    }

    if (fields.every(field => field !== null)) {
        alert("Unentschieden!");
        resetGame(); // Spiel zurücksetzen
        return true;
    }

    return false;
}