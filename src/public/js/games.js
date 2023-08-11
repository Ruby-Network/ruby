async function fetchGames() {
    console.log("Fetching Games...");
    let games = await fetch('/games.json');
    let gamesJSON = await games.json();
    let gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = `
        <div id="homeBar" onclick="home(gamesPage(false))">
            <i class="fas fa-home"></i>
            <h1> Games </h1>
        </div>
    `;
    let tileContainer = document.createElement('div');
    tileContainer.setAttribute('id', 'tile-container');
    gamesContainer.appendChild(tileContainer);
    gamesJSON.forEach((game) => {
        tileContainer.innerHTML += `
            <div id="tile">
                <img src='${game.img}' alt='${game.name}' />
                <div id="seperator"></div>
                <h2>${game.name}</h2>
            </div>
        `;
    });
}
