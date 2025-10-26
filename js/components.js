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
        statName.textContent = `${statInfo.stat.name}: `;
        
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
};

const createCries = (data) => {
    const criesContainer = document.createElement("div");
    criesContainer.classList.add("pokemon-cries");
    
    const criesTitle = document.createElement("h3");
    criesTitle.textContent = "Cries";
    criesContainer.appendChild(criesTitle);
    
    if (data.cries) {
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
    }
    
    return criesContainer;
};

const createNavButtons = (data) =>{
    const navContainer = document.createElement("div");
    navContainer.classList.add("nav");

    const prevButton = document.createElement("button");
    prevButton.classList.add("nav-button","prev-button");
    prevButton.textContent = "← Previous";

    const nextButton = document.createElement("button");
    nextButton.classList.add("nav-button","next-button");
    nextButton.textContent = "Next →";

    prevButton.addEventListener("click", () =>{
        const prevId = data.id -1;
        if(prevId>0){
            fetchData(prevId.toString());
        }
    })

    nextButton.addEventListener("click", () =>{
        const nextId = data.id +1;
        if(nextId <= 1010){
            fetchData(nextId.toString());
        }
    })

    if (data.id <= 1) {
        prevButton.disabled = true;
        prevButton.classList.add("disabled");
    }
    
    if (data.id >= 1010) {
        nextButton.disabled = true;
        nextButton.classList.add("disabled");
    }
    
    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);
    
    return navContainer;
}

const createPokemonCard = (data) => {
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
    typeLabel.textContent = "Type: ";
    
    const typesContainer = document.createElement("div");
    typesContainer.classList.add("types");
    typeRow.appendChild(typeLabel);

    data.types.forEach(typeInfo => {
        const typeBadge = document.createElement("span");
        typeBadge.classList.add("type-badge");
        typeBadge.textContent = typeInfo.type.name +" ";
        typeRow.appendChild(typeBadge);
    });
        
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

const createPokemonListButton = (poke) => {
    const card = document.createElement("div");
    card.classList.add("card");  

    const button = document.createElement("button");
    button.textContent = poke.name;
    button.classList.add("pokemon-button");
    button.addEventListener("click", () => {
        const pokeInput = document.getElementById("poke-input");
        pokeInput.value = poke.name;
        handleSearch();
    });
    
    card.appendChild(button);
    return card;
};