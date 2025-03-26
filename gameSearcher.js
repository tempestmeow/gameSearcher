const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const apiKey = process.env.apiKey;
const submitByMonth = document.querySelector(".daysAgo");
const lastWeek = document.querySelector(".lastWeek");
const thisWeek = document.querySelector(".thisWeek");
const bestYear = document.querySelector(".bestYear");
const popular = document.querySelector(".popular");
const allTime = document.querySelector(".allTime");
const body = document.querySelector(".body");

let pagesContainer = document.querySelector(".pagesContainer");
let cardInfo = null;
const searchGames = async (input) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic&key=${apiKey}&search=${input}&page_size=100`
    );
    const data = await response.json();
    displayGames(data.results);
    console.log(data.results);
  } catch (error) {
    console.error("Error fetching from API", error);
  }
};

const searchByBestYear = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic,-rating,-reviews_count&key=${apiKey}&dates=2023-12-09,2024-12-09&page_size=100`
    );
    const data = await response.json();
    console.log(data);
    displayGames(data.results);
  } catch (error) {
    console.error("Error fetching data from RAWG API", error);
  }
};

const searchByLastMonth = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-released&key=${apiKey}&date=2024-12-09&page_size=100`
    );
    const data = await response.json();
    console.log(data);
    displayGames(data.results);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

const searchByLastWeek = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=released&key=${apiKey}&date=2024-12-02,2024-12-09&page_size=100`
    );
    const data = await response.json();
    console.log(data);
    displayGames(data.results);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

const createPagesContainer = () => {
  if (!pagesContainer) {
    pagesContainer = document.createElement("div");
    pagesContainer.classList.add("pagesContainer");
    body.appendChild(pagesContainer);
  } else {
    pagesContainer.style.display = "grid";
  }
};

const resetView = () => {
  if (cardInfo) {
    cardInfo.remove();
    cardInfo = null;
  }
  body.style.background = "#181818";
};

bestYear.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByBestYear();
});

lastWeek.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByLastWeek();
});

submitByMonth.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByLastMonth();
});

thisWeek.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByLastWeek();
});

const displayGames = (games) => {
  if (!pagesContainer) {
    console.error("pagesContainer is not defined");
    return;
  }

  pagesContainer.innerHTML = "";
  pagesContainer.style.display = "grid";

  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");

    gameCard.innerHTML = `
      <img class="gameBackground" src="${game.background_image}">
      <div class="gameInfo">
        <h3 class="gameName">${game.name}</h3>
        <h3 class="gameMetaRating">${game.rating}</h3>
      </div>
    `;

    pagesContainer.appendChild(gameCard);

    gameCard.addEventListener("click", () => {
      fetchGameDetails(game.id);
    });
  });
};

const fetchGameDetails = async (gameId) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
    );
    const game = await response.json();
    displayGameDetails(game);
  } catch (error) {
    console.error("Error fetching game details", error);
  }
};

const displayGameDetails = (game) => {
  console.log(game);
  if (!pagesContainer) return;

  pagesContainer.style.display = "none";

  if (cardInfo) cardInfo.remove();

  cardInfo = document.createElement("div");
  cardInfo.classList.add("cardInfo");

  const platformNames = game.platforms.map((x) => x.platform.name).join(", ");
  const genres = game.genres.map((x) => x.name).join(", ");
  const stores = game.stores.map((x) => x.store.name).join(", ");
  const ratings = game.ratings.map((x) => `${x.title}: ${x.count}`).join(", ");

  cardInfo.innerHTML = `
    <div class="gameDetails">
      <div class="gameTitleInfo">${game.name}</div>
      <div class="gameDescription">${
        game.description_raw ? game.description_raw : game.description
      }</div>
      <div class="gridContainer">
        <div class="ratingsCount info">${ratings}</div>
        <div class="gamePlatforms info">Available on: ${platformNames}</div>
        <div class="gameGenres info">Genres: ${genres}</div>
        <div class="gameRatings info">${ratings}</div>
        <div class="gameStores info">Stores Available: ${stores}</div>
      </div>
    </div>
  `;

  body.style.background = `linear-gradient(to top, black 30%, transparent 100%), url('${game.background_image}')`;
  body.style.backgroundSize = "cover";

  body.appendChild(cardInfo);
};

submitButton.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchGames(userInput.value);
});

searchByBestYear();
