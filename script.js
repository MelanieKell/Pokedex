let currentPokemon;  // hier gespeichert, damit mit allen funktionen darauf zugegriffen werden kann

let PokemonCards = [];
let offset = 0;


async function load20Pokemon(){
	let url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
	let response = await fetch(url);
	currentPokemon = await response.json();
	offset += 20;

}


function renderPokedex() {
	document.getElementById('pokemon-container').innerHTML += '';
    for (let i = 0; i < PokemonCards.length; i++) {
        document.getElementById('pokemon-container').innerHTML += `
        <div onclick="renderPokemonInfo(${i})">
			<img src="${PokemonCards[i]}" class="">
        </div>
        `;
    }
}


async function loadSinglePokemon() {
	let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
	let response = await fetch(url);
	currentPokemon = await response.json();  // aktuelles Pokemon als variable, da unterschiedliche geladen werden

	console.log('loaded pokemon', currentPokemon);
	renderPokemonInfo();
	showInfoAbout();
}

function renderPokemonInfo() {
	document.getElementById('pokemonName').innerHTML = currentPokemon['name'];// in das feld mit der id pokemonname soll der aktuelle pokemon name eingefügt werden [stelle im array von schnittstelle]
	document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['dream_world']['front_default'];  //bild vom pokemon
	document.getElementById('skills').innerHTML = currentPokemon['types']['0']['type']['name'];

}

function showInfoAbout() {
	document.getElementById('charmander-experience').innerHTML = currentPokemon['base_experience'];
	document.getElementById('charmander-height').innerHTML = currentPokemon['height'];
	document.getElementById('charmander-weight').innerHTML = currentPokemon['weight'];
	document.getElementById('charmander-abilities').innerHTML = currentPokemon['abilities']['0']['ability']['name'];
}

function handleTabClick(action) {
	if (action == 'about') {
		document.getElementById('pokemon-about').style.display = 'block';
		document.getElementById('pokemon-stats').style.display = 'none';
		document.getElementById('pokemon-moves').style.display = 'none';
	}
	if (action == 'stats') {
		document.getElementById('pokemon-about').style.display = 'none';
		document.getElementById('pokemon-stats').style.display = 'block';
		document.getElementById('pokemon-moves').style.display = 'none';
		/* show stats */
		document.getElementById('charmander-hp').innerHTML = currentPokemon['stats']['0']['base_stat'];
		document.getElementById('charmander-attack').innerHTML = currentPokemon['stats']['1']['base_stat'];
		document.getElementById('charmander-defense').innerHTML = currentPokemon['stats']['2']['base_stat'];
		document.getElementById('charmander-speed').innerHTML = currentPokemon['stats']['5']['base_stat'];
	}
	if (action == 'moves') {
		document.getElementById('pokemon-about').style.display = 'none';
		document.getElementById('pokemon-stats').style.display = 'none';
		document.getElementById('pokemon-moves').style.display = 'block';
		/* show moves */
		document.getElementById('charmander-move-1').innerHTML = currentPokemon['moves']['0']['move']['name'];
		document.getElementById('charmander-move-2').innerHTML = currentPokemon['moves']['1']['move']['name'];
		document.getElementById('charmander-move-3').innerHTML = currentPokemon['moves']['2']['move']['name'];
		document.getElementById('charmander-move-4').innerHTML = currentPokemon['moves']['3']['move']['name'];
	}
}