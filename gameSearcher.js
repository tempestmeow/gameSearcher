const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('submitButton');

const pagesContainer = document.querySelector('.pagesContainer');
const apiKey = '2c80b02fad8b4f65872780867579ae94';

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


const searchGames = async(input) => {

    try {
    const response = await(fetch)(`https://api.rawg.io/api/games?key=${apiKey}&search=${input}&page_size=10`);
    const data = await response.json();
    console.log(data)
    displayGames(data.results); }

    catch(error){
        console.log('Error fetching data from RAWG API', error);
    }

}

const displayGames = (games) => {

    pagesContainer.innerHTML = "";

    games.forEach(game => {

        const gameCard = document.createElement('div');
        gameCard.classList.add('gameCard');

        gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <img src="${game.background_image}">

        `
        pagesContainer.appendChild(gameCard);



    })

}

submitButton.addEventListener('click', ()=> {
    
    searchGames(userInput.value);
})

