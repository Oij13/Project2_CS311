const getPikachu = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
        const data = await response.json();

        const pikachu = document.querySelector(".pikachu");
        if (pikachu) {
            pikachu.innerHTML = `<img src="${data.sprites.front_default}" alt="Pikachu"/>`;
        }
    } catch(error) {
        console.error("Error fetching Pikachu:", error);
    }
}

const fetchPokemonData = async (pokemon = null) => {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
        
        if (pokemon) {
            const formattedPokemon = pokemon.replace(/\s+/g, '-');
            url = `https://pokeapi.co/api/v2/pokemon/${formattedPokemon}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Pokemon "${pokemon}" not found`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};