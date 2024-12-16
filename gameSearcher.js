const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const pagesContainer = document.querySelector(".pagesContainer");
const apiKey = "2c80b02fad8b4f65872780867579ae94";
const submitByMonth = document.querySelector(".daysAgo");
const lastWeek = document.querySelector(".lastWeek");
const thisWeek = document.querySelector(".thisWeek");
const bestYear = document.querySelector(".bestYear");
const popular = document.querySelector(".popular");
const allTime = document.querySelector(".allTime");
const body = document.querySelector(".body");

const searchGames = async (input) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic&key=${apiKey}&search=${input}&page_size=100`
    );
    const data = await response.json();
    displayGames(data.results);
    console.log(data.results);
  } catch (error) {
    console.error("error fetching from api");
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

const searchByBestYear = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?ordering=-metacritic,-rating,-reviews_count&key=${apiKey}&dates=2023-12-09,2024-12-09&page_size=100`
    );
    const data = await response.json();
    console.log(data);
    displayGames(data.results);
  } catch (error) {
    console.log("Error fetching data from RAWG API", error);
  }
};

bestYear.addEventListener("click", () => {
  searchByBestYear();
});

lastWeek.addEventListener("click", () => {
  searchByLastWeek();
});

submitByMonth.addEventListener("click", () => {
  searchByLastMonth();
});

thisWeek.addEventListener("click", () => {
  searchByLastWeek();
});

const displayGames = (games) => {
  pagesContainer.innerHTML = "";

  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("gameCard");

    gameCard.innerHTML = `
        <img class="gameBackground" src="${game.background_image}">
        <div class="gameInfo"><h3 class="gameName">${game.name}</h3>
        <h3 class="gameMetaRating">${game.rating}</h3></div>
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
    console.error("error fetching game details", error);
  }
};

const displayGameDetails = (game) => {
  console.log(game);
  pagesContainer.innerHTML = "";

  const gameInfo = document.createElement("div");
  gameInfo.classList.add("gameInfo");

  const platformNames = game.platforms.map((x) => x.platform.name).join(", ");
  const genres = game.genres.map((x) => x.name).join(", ");
  const stores = game.stores.map((x) => x.store.name).join(", ");
  const ratings = game.ratings.map((x) => `${x.title}: ${x.count}`).join(", ");

  gameInfo.innerHTML = `
    <img class="infoImage" src="${game.background_image}"></div>
    <div class="gameDetails">
        <div class="gameTitleInfo">${game.name}</div>
        <div class="gameDescription">${game.description}</div>
        <div class="ratingsCount">Ratings: ${game.ratings_count}</div>
        <div class="gamePlatforms">Available on: ${platformNames}</div>
        <div class="gameGenres">Genres: ${genres}</div>
        <div class="gameRatings">${ratings}</div>
        <div class="gameStores">Stores Available: ${stores}</div>
    </div>
  `;

  pagesContainer.remove();
  body.appendChild(gameInfo);
  body.style.background = `linear-gradient(to bottom, transparent 30%, black 100%), url('${game.background_image}')`;
};

submitButton.addEventListener("click", () => {
  searchGames(userInput.value);
});

pagesContainer.innerHTML = "";

const gameInfo = document.createElement("div");
gameInfo.classList.add("gameInfo");

/*
gameInfo.innerHTML = `
  <img class="infoImage" src="
https://media.rawg.io/media/games/779/77988e89f7862afeede524420aa251b0.jpg"></div>
  <div class="gameDetails">
      <div class="gameTitleInfo">Black Myth: Wukong</div>
      <div class="gameDescription">A world unseen, where new sights rise with every stride. Enter a fascinating realm filled with the wonders and discoveries of ancient Chinese mythology!

As the Destined One, you shall venture through breathtaking landscapes in the classic tale of Journey to the West, creating a new epic of uncharted adventures.

Heroic Monkey, might and fame, adversaries rise, to test his name. One of the major highlights of Journey to the West is its diverse cast of adversaries, each with unique strengths.
As the Destined One, you shall encounter powerful foes and worthy rivals throughout your journey. Fearlessly engage them in epic battles that know no surrender.

Spells unbound, knowledge's flight, infinite abilities take their height. Spells, transformations, and magic vessels in all manifestations, complementary yet adversarial, have long been iconic combat elements in Chinese mythology.
As the Destined One, aside from mastering various staff techniques, you can also freely combine different spells, abilities, weapons, and equipment to find the winning formula that best suits your combat style.

Within beings of every kind lies the story of a life. Beneath the ferocity and craftiness of your foes lies an engaging tapestry of their origins, personalities, and motivations waiting to be revealed.
As the Destined One, you will uncover the stories behind a variety of characters, delving beyond your battles with them, to taste the love and hate, greed and fury they once had and still carry with them.</div>
      <div class="ratingsCount">Ratings: 75</div>
      <div class="gamePlatforms">Available on: PC, Xbox Series S/X, PlayStation 5</div>
      <div class="gameGenres">Genres: Action, Adventure, RPG</div>
      <div class="gameRatings">exceptional: 50, recommended: 18, meh: 7, skip: 4</div>
      <div class="gameStores">Stores Available: Epic Games, Steam</div>
  </div>
`;

pagesContainer.remove();
body.appendChild(gameInfo);
*/
