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
        <button id="exit-game" class="dnone" onclick="exitGame()"><i class="fa-solid fa-circle-xmark"></i></button>
        <iframe id="game-iframe" class="dnone"></iframe>
    `;
    let tileContainer = document.createElement('div');
    tileContainer.setAttribute('id', 'tile-container');
    gamesContainer.appendChild(tileContainer);
    gamesJSON.forEach((game) => {
        let name = game.name.toLowerCase().replace(/\s/g, '-');
        if (game.cdn === "true") {
            tileContainer.innerHTML += `
                <div id="tile" onclick="showGame('gms/ruby-network/ruby-assets/main/${name}/${game.baseFile}')">
                    <img src='${game.img}' alt='${game.name}' />
                    <div id="seperator"></div>
                    <h2>${game.name}</h2>
                </div>
            `;
        }
        if (game.proxy === "true") {
            let url = proxyOtherStuff(game.url);
            tileContainer.innerHTML += `
                <div id="tile" onclick="showGame('${url}')">
                    <img src='${game.img}' alt='${game.name}' />
                    <div id="seperator"></div>
                    <h2>${game.name}</h2>
                </div>
            `;
        }
    });
}
function showGame(url) {
    let f = document.getElementById('game-iframe');
    let r = document.getElementById('exit-game');
    r.removeAttribute('class', 'dnone');
    f.removeAttribute('class', 'dnone');
    f.src = url;
    document.body.scrollTop = 0;
    localStorage.setItem('scrollPosition', document.documentElement.scrollTop || document.body.scrollTop);
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    f.focus()
    //f.contentWindow.document.body.focus()
}
function exitGame() {
    let f = document.getElementById('game-iframe');
    let r = document.getElementById('exit-game');
    r.setAttribute('class', 'dnone');
    f.setAttribute('class', 'dnone');
    f.src = '';
    document.documentElement.scrollTop = localStorage.getItem('scrollPosition');
    localStorage.removeItem('scrollPosition');
    document.body.style.overflow = 'auto';
}
