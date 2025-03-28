const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const apiKey = "2c80b02fad8b4f65872780867579ae94";
const submitByMonth = document.querySelector(".daysAgo");
const lastWeek = document.querySelector(".lastWeek");
const thisWeek = document.querySelector(".thisWeek");
const bestYear = document.querySelector(".bestYear");
const popular = document.querySelector(".popular");
const allTime = document.querySelector(".allTime");
const body = document.querySelector(".body");
const body_orig = document.querySelector("body");
const header = document.querySelector(".header");
const main_right = document.querySelector(".main-right");

const sortGamesDropdown = document.getElementById("sortGames");

let pagesContainer = document.querySelector(".pagesContainer");
let cardInfo = null;
let currentGames = [];
let inGame = false;

const sortGames = (games, sortBy) => {
  switch (sortBy) {
    case "name":
      return games.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return games.sort((a, b) => b.name.localeCompare(a.name));
    case "rating":
      return games.sort((a, b) => b.rating - a.rating);
    case "rating-lowest":
      return games.sort((a, b) => a.rating - b.rating);
    case "released":
      return games.sort((a, b) => new Date(b.released) - new Date(a.released));
    case "released-oldest":
      return games.sort((a, b) => new Date(a.released) - new Date(b.released));
    default:
      return games;
  }
};

sortGamesDropdown.addEventListener("change", (e) => {
  const sortBy = e.target.value;
  if (sortBy !== "default") {
    const sortedGames = sortGames([...currentGames], sortBy);
    displayGames(sortedGames);
  }
});

const searchGames = async (input) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic&key=${apiKey}&search=${input}&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    displayGames(currentGames);
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
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.error("Error fetching data from RAWG API", error);
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

const searchByPopular2024 = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-rating&key=${apiKey}&dates=2024-01-01,2024-12-31&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.error("Error fetching popular games from RAWG API", error);
  }
};

const searchByAllTimePopular = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-rating,-reviews_count&key=${apiKey}&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.error("Error fetching all-time popular games from RAWG API", error);
  }
};

const searchByLastMonth = async () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-released&key=${apiKey}&dates=${formattedThirtyDaysAgo},${formattedToday}&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

const searchByLastWeek = async () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-released&key=${apiKey}&dates=${formattedSevenDaysAgo},${formattedToday}&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

const searchByThisWeek = async () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const formattedToday = today.toISOString().split("T")[0];
  const formattedStartOfWeek = startOfWeek.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-released&key=${apiKey}&dates=${formattedStartOfWeek},${formattedToday}&page_size=100`
    );
    const data = await response.json();
    currentGames = data.results;
    console.log(data);
    displayGames(currentGames);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

thisWeek.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByThisWeek();
});

submitByMonth.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByLastMonth();
});

lastWeek.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByLastWeek();
});

popular.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByPopular2024();
});

allTime.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByAllTimePopular();
});

const resetView = () => {
  inGame = false;

  updateSortVisibility();

  if (cardInfo) {
    cardInfo.remove();
    cardInfo = null;
  }
  body.style.background = "#181818";
  sortGamesDropdown.selectedIndex = 0;
};

bestYear.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchByBestYear();
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
      inGame = !inGame;
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
  updateSortVisibility();
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
      <div class="gameTitleInfo"><span>${game.name}</span> </div>
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

  document.querySelectorAll("*").forEach((element) => {
    element.style.background = "transparent";
  });

  document.documentElement.style.minHeight = "100%";
  document.body.style.minHeight = "100%";
  document.documentElement.style.background = `
    linear-gradient(to top, black 30%, transparent 100%), 
    linear-gradient(to top, transparent 65%, rgb(0,0,0,0.7) 100%),
    url('${game.background_image}')
`;
  document.documentElement.style.backgroundAttachment = "fixed";
  document.documentElement.style.backgroundSize = "cover";
  document.documentElement.style.backgroundPosition = "center";

  body.appendChild(cardInfo);
};

submitButton.addEventListener("click", () => {
  resetView();
  createPagesContainer();
  searchGames(userInput.value);
});

searchByBestYear();

const updateSortVisibility = () => {
  sortGamesDropdown.style.display = inGame ? "none" : "block";
  document.querySelectorAll("*").forEach((element) => {
    element.style.background = "";
  });
};
