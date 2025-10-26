const pokeButton = document.getElementById("poke-button");
const allButton = document.getElementById("all-button");
const pokeInput = document.getElementById("poke-input");


const fetchData = async (pokemon = null) => {
    try {
        const data = await fetchPokemonData(pokemon);
        clearContainers();

        if (pokemon) {
            displaySinglePokemon(data);
        } else {
            displayPokemonList(data.results);
        }
    } catch (error) {
        console.error("Error fetching pokemon", error);
        displayError(error.message || "Network error. Please check your internet connection and try again.");
    }
};

const handleSearch = () => {
    const pokemonName = pokeInput.value.trim().toLowerCase();
    fetchData(pokemonName || null)
};
const setupEventListeners = () =>{
    pokeButton.addEventListener("click", handleSearch);

    allButton.addEventListener("click", () => {
        fetchData();
        pokeInput.value = "";
    });
    pokeInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter"){
            handleSearch();
        }   
    });
}

window.onload = () => {
    getPikachu();
    fetchData();
    setupEventListeners();
} 
