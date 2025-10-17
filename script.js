const pokeButton = document.getElementById("poke-button");
const allButton = document.getElementById("all-button");
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

const getPikachu = async () =>{
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
        const data = await response.json();

        const pikachu = document.querySelector(".pikachu");
        pikachu.innerHTML = `<img src="${data.sprites.front_default}" alt="Pikachu"/>`;
        console.log(`${pikachu}`);
    } catch(error){
        console.error(error);
    }
}

const createStats = (data) => {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("pokemon-stats");

    const statsTitle = document.createElement("h3");
    statsTitle.textContent = "Base Stats";
    statsContainer.appendChild(statsTitle);
    
    data.stats.forEach(statInfo => {
        const statItem = document.createElement("div");
        statItem.classList.add("stat-item");
        
        const statName = document.createElement("span");
        statName.classList.add("stat-name");
        statName.textContent = `${statInfo.stat.name}:`;
        
        const statValue = document.createElement("span");
        statValue.classList.add("stat-value");
        statValue.textContent = statInfo.base_stat;
        
        const statBar = document.createElement("div");
        statBar.classList.add("stat-bar");
        
        const statFill = document.createElement("div");
        statFill.classList.add("stat-fill");
        statFill.style.width = `${(statInfo.base_stat / 255) * 100}%`;
        
        statBar.appendChild(statFill);
        statItem.appendChild(statName);
        statItem.appendChild(statValue);
        statItem.appendChild(statBar);
        statsContainer.appendChild(statItem);
    });
    
    return statsContainer;
}

const createCries = (data) => {
    const criesContainer = document.createElement("div");
    criesContainer.classList.add("pokemon-cries");
    
    const criesTitle = document.createElement("h3");
    criesTitle.textContent = "Cries";
    criesContainer.appendChild(criesTitle);
    
    Object.entries(data.cries).forEach(([cryType, cryUrl]) => {
        const cryPlayer = document.createElement("div");
        cryPlayer.classList.add("cry-player");
        
        const label = document.createElement("label");
        label.textContent = `${cryType}:`;
        
        const audio = document.createElement("audio");
        audio.controls = true;
        
        const source = document.createElement("source");
        source.src = cryUrl;
        source.type = "audio/ogg";
        
        audio.appendChild(source);
        cryPlayer.appendChild(label);
        cryPlayer.appendChild(audio);
        criesContainer.appendChild(cryPlayer);
    });
    
    return criesContainer;
};

const createCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const header = document.createElement("div");
    header.classList.add("pokemon-header");
    
    const name = document.createElement("h2");
    name.classList.add("pokemon-name");
    name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    
    const id = document.createElement("span");
    id.classList.add("pokemon-id");
    id.textContent = `#${data.id}`;
    
    header.appendChild(name);
    header.appendChild(id);
    
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("pokemon-image");
    
    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    image.alt = data.name;
    
    imageContainer.appendChild(image);
    
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("pokemon-info");
    
    const heightRow = document.createElement("div");
    heightRow.classList.add("info-row");
    heightRow.innerHTML = `
        <span class="label">Height:</span>
        <span class="value">${data.height / 10} m (${Math.round(data.height * 3.937)}")</span>
    `;
    
    const weightRow = document.createElement("div");
    weightRow.classList.add("info-row");
    weightRow.innerHTML = `
        <span class="label">Weight:</span>
        <span class="value">${data.weight / 10} kg (${Math.round(data.weight * 0.220462)} lbs)</span>
    `;
    
    const typeRow = document.createElement("div");
    typeRow.classList.add("info-row");
    
    const typeLabel = document.createElement("span");
    typeLabel.classList.add("label");
    typeLabel.textContent = "Type:";
    
    const typesContainer = document.createElement("div");
    typesContainer.classList.add("types");
    
    data.types.forEach(typeInfo => {
        const typeBadge = document.createElement("span");
        typeBadge.classList.add("type-badge", `type-${typeInfo.type.name}`);
        typeBadge.textContent = typeInfo.type.name;
        typesContainer.appendChild(typeBadge);
    });
    
    typeRow.appendChild(typeLabel);
    typeRow.appendChild(typesContainer);
    
    infoContainer.appendChild(heightRow);
    infoContainer.appendChild(weightRow);
    infoContainer.appendChild(typeRow);
    
    card.appendChild(header);
    card.appendChild(imageContainer);
    card.appendChild(infoContainer);
    card.appendChild(createStats(data));
    card.appendChild(createCries(data));
    
    return card;
};

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
        const pokeContainer = document.getElementById("poke-container");
        const detailContainer = document.getElementById("poke-detail");

        pokeContainer.innerHTML = "";
        detailContainer.innerHTML = "";

        if (pokemon){
            const card = createCard(data);
            detailContainer.appendChild(card);
        }
        else{
            const pokemon = data.results;
            pokemon.forEach((poke) => {
                const card = document.createElement("div");
                card.classList.add("card");  

                const button = document.createElement("button");
                button.textContent = poke.name;
                button.classList.add("pokemon-button");
                button.addEventListener("click", () => {
                    pokeInput.value = poke.name;
                    handleSearch();
                });
                card.appendChild(button);
            pokeContainer.appendChild(card);
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

window.onload = () => {
        getPikachu();

    handleSearch();
} 

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