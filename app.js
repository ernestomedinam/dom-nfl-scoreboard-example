window.onload = (event) => {
    const h1 = document.createElement("h1");
    h1.textContent = "Welcome";
    h1.style.color = "purple";
    h1.classList.add("display-1", "text-success");
    h1.style.textAlign = "center";
    h1.style.margin = "2rem 0";
    // append this h1 as a child for our id:app div 
    const body = document.body;
    body.classList.add("bg-dark");
    // body.style.backgroundColor = "yellow";
    body.appendChild(h1);
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexFlow = "row wrap";
    container.style.width = "100%";
    container.addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            const totalClicksP = document.querySelector("#total-clicks");
            totalClicksP.textContent = parseInt(totalClicksP.textContent) + 1;
        }
    });
    const homeTeamDiv = buildTeamDiv("home");
    const visitorTeamDiv = buildTeamDiv("away");
    container.appendChild(homeTeamDiv);
    container.appendChild(visitorTeamDiv);
    body.appendChild(container);
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("btn", "btn-danger");
    resetBtn.textContent = "reset match";
    resetBtn.addEventListener("click", (event) => {
        const scoreParagraphs = document.querySelectorAll("p");
        for (const scoreP of scoreParagraphs) {
            scoreP.textContent = 0;
        }
    });
    body.appendChild(resetBtn);
    const totalClicksP = document.createElement("p");
    totalClicksP.textContent = 0;
    totalClicksP.id = "total-clicks";
    totalClicksP.style.color = "white";
    totalClicksP.style.fontSize = "4rem";
    body.appendChild(totalClicksP);
};

function buildTeamDiv(mode) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexFlow = "column";
    div.style.backgroundColor = "black";
    div.classList.add("border", "border-success");
    div.style.borderWidth = "2px";
    div.style.borderRadius = "0.5rem";
    div.style.flexGrow = "1";
    div.style.paddingTop = "1rem";
    div.style.margin = "0 0.5rem";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = (mode === "home") 
        ? "Name for home team" 
        : "Name for visiting team";
    input.classList.add("form-control", "my-3");
    input.addEventListener("keypress", function(event) {
        console.log(">>> 😲", event.key);
        if (event.key.toLowerCase() === "a") event.preventDefault();
        // event.stopPropagation();
    });
    input.addEventListener("input", function(event) {
        console.log(">>> 😑", event.target.value);
    });
    div.appendChild(input);
    const teamNameH3 = document.createElement("h3");
    teamNameH3.textContent = (mode === "home") 
        ? "Home" 
        : "Visitor";
    teamNameH3.style.color = "white";
    teamNameH3.style.textAlign = "center";
    const scoreParagraph = document.createElement("p");
    scoreParagraph.id = (mode === "home")
        ? "home-score"
        : "away-score";
    scoreParagraph.textContent = 0;
    scoreParagraph.style.color = "white";
    scoreParagraph.style.textAlign = "center";
    scoreParagraph.classList.add("display-3");
    div.appendChild(teamNameH3);
    div.appendChild(scoreParagraph);
    // append buttons
    const touchdownBtn = document.createElement("button");
    touchdownBtn.textContent = "Touchdown";
    touchdownBtn.classList.add("btn", "btn-success");
    touchdownBtn.addEventListener("click", (event) => {
        const targetScoreParagraph = document.getElementById(
            (mode === "home") 
                ? "home-score" 
                : "away-score"
        );
        targetScoreParagraph.textContent = parseInt(targetScoreParagraph.textContent) + 7;
        event.stopPropagation();
    });
    const fgBtn = document.createElement("button");
    fgBtn.textContent = "Field Goal";
    fgBtn.classList.add("btn", "btn-primary");
    fgBtn.addEventListener("click", (event) => {
        const targetScoreParagraph = document.getElementById(
            (mode === "home") 
                ? "home-score" 
                : "away-score"
        );
        targetScoreParagraph.textContent = parseInt(targetScoreParagraph.textContent) + 3;
    });
    div.appendChild(touchdownBtn);
    div.appendChild(fgBtn);
    return div;
};