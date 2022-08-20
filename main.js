const poke_container = document.getElementById("poke_container");

const pokemons_number = 905;
const colors = {
  fire: "#fddfdf",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "e6e0d4",
  normal: "#f5f5f5",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);
  const pokemon = await res.json();

  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");

  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map((el) => el.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  console.log(poke_types.indexOf(type));
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  let pokemonId = pokemon.id;

  if (pokemonId < 10) {
    pokemonId = `00${pokemonId}`;
  } else if (pokemonId >= 10 && pokemonId < 100) {
    pokemonId = `0${pokemonId}`;
  }

  let pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;

  const pokeInnerHTML = `
  <div class="img-container">
    <img src=${pokemonImage}>
  </div>
  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
}

fetchPokemons();
