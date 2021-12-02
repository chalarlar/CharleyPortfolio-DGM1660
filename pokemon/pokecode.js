import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
      console.log(pokemon);
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon(100, 5);
});

const moreButton = document.querySelector('.morePokemon')
moreButton.addEventListener('click', () => {
    let limit = prompt('How many more Pokemon do you want?')
    let offset = prompt('At which Pokemon ID should I start loading?')
    loadPokemon(offset, limit)
})

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("What is the height of your new Pokemon?");
  let pokeWeight = prompt("What is the weight of your new Pokemon?");
  let pokeAbilities = prompt(
    "What are your Pokemon' abilities? (use commas to seperate items"
  );
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities)
  );
  populatePokeCard(newPokemon);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    };
  });
}

class Pokemon {
  constructor(name, height, weight, abilities) {
    (this.id = 100),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities);
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  // typesBackground(pokemon, pokeFront)
  return pokeFront;
}

function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let pokeType2 = pokemon.types[1]?.type.name
    card.style.setProperty(
    'background', 
    `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
}

function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
        case 'grass': 
        color = '#00FF00'
        break
        case 'fire': 
        color = '#FF0000'
        break
        case 'water': 
        color = '#0000FF'
        break
        case 'bug': 
        color = '#77FF00'
        break
        case 'normal': 
        color = '#FF55DC'
        break
        case 'flying': 
        color = '#AA00FF'
        break
        case 'poison': 
        color = '#CBFF44'
        break
        case 'electric': 
        color = '#77FF77'
        break
        case 'psychic': 
        color = '#333333'
        break
        default:
            color = '#888888'
    }
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  return pokeBack;
}
