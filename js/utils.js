const displayError = (message) => {
    clearContainers();
    const container = document.getElementById("poke-container");
    container.innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}

const clearContainers = () =>{
    const pokeContainer = document.getElementById("poke-container");
    const detailContainer = document.getElementById("poke-detail");

    if (pokeContainer) pokeContainer.innerHTML = "";
    if (detailContainer) detailContainer.innerHTML = "";
}

const displayPokemonList = (pokemonList) =>{
    const pokeContainer = document.getElementById("poke-container");

    pokemonList.forEach(poke => {
        const card = createPokemonListButton(poke);
        card.classList.add("card-list");
        pokeContainer.appendChild(card);
    });
}
const displaySinglePokemon = (data) => {
        const detailContainer = document.getElementById("poke-detail");
        const card = createPokemonCard(data);
        const nav = createNavButtons(data);
        detailContainer.appendChild(nav);
        detailContainer.appendChild(card);
    }