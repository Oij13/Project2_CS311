const pokeButton = document.getElementById("poke-button");
const pokeInput = document.getElementById("poke-input");

const displayError = (message) => {
    const container = document.getElementById("poke-container");
    container.innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}

const fetchData = async (pokemon = null) => {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

        if(pokemon){
            url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        }

        const response = await fetch(url);

        if(!response.ok){
            displayError(`Pokemon "${pokemon}" not found. Please check your spelling and try again.`);
            return;
        }
        const data = await response.json();
        const container = document.getElementById("poke-container");

        container.innerHTML = "";

        if (pokemon){
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${data.sprites.front_default}" alt="pokemon image"
                <h3>${data.name}</h3>
                <p>Height: ${data.height}</p>
                <p>Weight: ${data.weight}</p>
            `;
            container.appendChild(card);
        }
        else{
            const pokemon = data.results;
            pokemon.forEach((poke) => {
                const card = document.createElement("div");
                card.classList.add("card");  
                const button = document.createElement("button");
                button.textContent = poke.name;
                button.classList.add("pokemon-button");
                container.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error fetching pokemon", error);
    }
};

const handleSearch = () => {
    const pokemonName = pokeInput.value.trim().toLowerCase();
    fetchData(pokemonName || null)
};

pokeButton.addEventListener("click", handleSearch);
pokeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        handleSearch();
    }   
});