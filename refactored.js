const INITIAL_STATE = {
    status: undefined,
    homeTeam: undefined,
    awayTeam: undefined,
    homeScore: 0,
    awayScore: 0,
    totalScores: 0
};

document.onreadystatechange = (event) => {
    if (document.readyState !== "complete") return;
    window.state = INITIAL_STATE;
    window.setState = function(newState) {
        window.state = newState;
        mountAndRender();
    }
    mountAndRender();
};

function mountAndRender() {
    const header = buildHeader();
    const body = document.body;
    body.classList.add("bg-dark");
    body.innerHTML = "";
    body.appendChild(header);
    const container = buildContainer();
    const homeTeam = buildTeam("home");
    const awayTeam = buildTeam("away");
    container.appendChild(homeTeam);
    container.appendChild(awayTeam);
    body.appendChild(container);
    const footer = buildFooter();
    body.appendChild(footer);
    console.log("💚 current state value:", window.state);
};

function buildFooter() {
    let footer = document.createElement("div");
    footer.style.display = "flex";
    footer.style.flexFlow = "column nowrap";
    footer.style.width = "100%";
    let footerButton = document.createElement("button");
    footerButton.classList.add("btn", "mx-auto", "mt-4");
    if (window.state?.status === "started") {
        footerButton.classList.add("btn-danger");
        footerButton.textContent = "reset match";
        footerButton.addEventListener("click", (event) => {
            setState(INITIAL_STATE);
        });
    } else {
        footerButton.classList.add("btn-primary");
        footerButton.textContent = "start match";
        footerButton.addEventListener("click", (event) => {
            const homeInput = document.querySelector("#home-input");
            const awayInput = document.querySelector("#away-input");
            if (!homeInput?.value) {
                alert("no name for home team...");
                event.stopPropagation();
                return;
            }
            if (!awayInput?.value) {
                alert("no name for home team...");
                event.stopPropagation();
                return;
            }
            setState({
                ...window.state,
                status: "started",
                homeTeam: homeInput.value,
                awayTeam: awayInput.value
            });
        })
    }
    footer.appendChild(footerButton);
    const totalClicksP = document.createElement("p");
    totalClicksP.textContent = window.state.totalScores;
    totalClicksP.id = "total-clicks";
    totalClicksP.style.color = "white";
    totalClicksP.style.fontSize = "4rem";
    totalClicksP.classList.add("text-center", "w-100");
    if (window.state.status === "started") footer.appendChild(totalClicksP);
    return footer;
};

function buildTeam(mode) {
    const teamContainer = buildTeamContainer();
    let teamHeader = buildTeamNameInput(mode);
    if (window.state[`${mode}Team`]) {
        teamHeader = buildTeamName(window.state[`${mode}Team`]);
    }
    teamContainer.appendChild(teamHeader);
    const teamScore = buildTeamScore(mode);
    teamContainer.appendChild(teamScore);
    const buttons = buildTeamButtons(mode);
    teamContainer.appendChild(buttons[0]);
    teamContainer.appendChild(buttons[1]);
    return teamContainer;
};

function handleScore(team, points) {
    window.setState({
        ...window.state,
        [`${team}Score`]: window.state[`${team}Score`] + points
    });
};

function buildTeamButtons(mode) {
    const touchdownBtn = document.createElement("button");
    touchdownBtn.textContent = "Touchdown";
    touchdownBtn.classList.add("btn", "btn-success", "my-2");
    touchdownBtn.addEventListener("click", (event) => handleScore(mode, 7));
    const fgBtn = document.createElement("button");
    fgBtn.textContent = "Field Goal";
    fgBtn.classList.add("btn", "btn-primary", "my-2");
    fgBtn.addEventListener("click", (event) => handleScore(mode, 3));
    if (window.state?.status !== "started") {
        touchdownBtn.disabled = true;
        fgBtn.disabled = true;
    }
    return [
        touchdownBtn,
        fgBtn
    ];
};

function buildTeamScore(mode) {
    const scoreParagraph = document.createElement("p");
    scoreParagraph.id = `${mode}-score`;
    scoreParagraph.textContent = window.state[`${mode}Score`];
    scoreParagraph.style.color = "white";
    scoreParagraph.style.textAlign = "center";
    scoreParagraph.classList.add("display-3");
    return scoreParagraph;
};

function buildTeamName(name) {
    const teamNameH3 = document.createElement("h3");
    teamNameH3.textContent = name;
    teamNameH3.style.color = "white";
    teamNameH3.style.textAlign = "center";
    return teamNameH3;
};

function buildTeamNameInput(mode) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `${mode}-input`;
    input.placeholder = (mode === "home") 
        ? "Name for home team" 
        : "Name for visiting team";
    input.classList.add("form-control", "my-3");
    return input;
};

function buildTeamContainer() {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexFlow = "column";
    div.style.backgroundColor = "black";
    div.classList.add("border", "border-success");
    div.style.borderWidth = "2px";
    div.style.borderRadius = "0.5rem";
    div.style.flexGrow = "1";
    div.style.padding = "1rem 2rem";
    div.style.margin = "0 0.5rem";
    return div;
};

function buildHeader() {
    const h1 = document.createElement("h1");
    h1.textContent = "Welcome";
    h1.style.color = "purple";
    h1.classList.add("display-1", "text-success");
    h1.style.textAlign = "center";
    h1.style.margin = "2rem 0";
    return h1;
};

function buildContainer() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexFlow = "row wrap";
    container.style.width = "100%";
    container.addEventListener("click", function(event) {
        if (event.target.nodeName === "BUTTON") {
            setState({
                ...window.state,
                totalScores: window.state.totalScores + 1
            });
        }
    });
    return container;
};
