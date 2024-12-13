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
/*
async function fetchData() {

    try {
        
        const pokemonName = userInput.value
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await result.json();
        const pokemonImg = data.sprites.front_shiny;
        
    

        output.src= pokemonImg;

    }
    catch(error) {
        console.log(error);
    }
}

submitButton.addEventListener('click', () => {

    fetchData();

}) */

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

searchGames();

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
/*
for(i=0;i <12; i++) {
    const gameCard = document.createElement('div');
    gameCard.classList.add('gameCard');

    gameCard.innerHTML = `
    <img class="gameBackground" src="https://media.rawg.io/media/games/936/936f0ffac0b3c9f5c8d185f610ed2631.jpg">
    <div class="gameInfo"><h3 class="gameName">Super Mario Galaxy</h3>
    <h3 class="gameMetaRating">97</h3></div>

    `
    pagesContainer.appendChild(gameCard);

} */

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
  });
};

submitButton.addEventListener("click", () => {
  searchGamesMetaCritic(userInput.value);
});

const searchGamesMetaCritic = async (input) => {
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
