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
  loadPokemon(300, 25);
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
  let pokeAbilities = prompt(
    "What are your Pokemon' abilities? (use commas to seperate items"
  );
  let pokeTypes = prompt("What type of Pokemon is it? Please indicate no more than 2 types seperated by a comma (ex: grass, electric)")
  let newPokemon = new Pokemon(
    pokeName,
    getAbilitiesArray(pokeAbilities),
    getTypesArray(pokeTypes)
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

function getTypesArray(commaString) {
  let tempArray = commaString.split(",")
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName,
      }
    }
  })
}

class Pokemon {
  constructor(name, abilities, types) {
    this.id = 100,
      this.name = name,
      this.abilities = abilities,
      this.types = types
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

  typesBackground(pokemon, pokeFront)
  return pokeFront;
}

function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let pokeType2 = pokemon.types[1]?.type.name
    console.log(pokeType1, pokeType2)
    if(!pokeType2) {
      card.style.setProperty('background', getPokeTypeColor(pokeType1))
    } else {
      card.style.setProperty(
        'background', 
        `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`,
        )
    }
}

function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
        case 'grass': 
        color = '#00AB00'
        break
        case 'fire': 
        color = '#FF0000'
        break
        case 'water': 
        color = '#0094FF'
        break
        case 'bug': 
        color = '#FF8C0A'
        break
        case 'normal': 
        color = '#9E9E9E'
        break
        case 'flying': 
        color = '#C6CBFF'
        break
        case 'poison': 
        color = '#A111A8'
        break
        case 'electric': 
        color = '#FAFF19'
        break
        case 'psychic': 
        color = '#FF5685'
        break
        default:
            color = '#888888'
    }
    return color
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
  const typesList = document.createElement('ol')
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name
    typesList.appendChild(typeItem)
  })
  pokeBack.appendChild(abilityList)
  pokeBack.appendChild(typesList)
  return pokeBack
}
