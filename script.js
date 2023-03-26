/*
Pokedex App
For this exercise, we will create an app akin to a Pokedex from the game and tv series Pokémon with the end goal of you dominating how to consume the resources from any API. 

The examples that you'll find here are only for you to get inspiration as I will give points to styles, and this includes your design (feel free to look for more inspiration on the internet). 

This project will be done in pairs as part of your tasks you need to have a meeting before starting to code where you'll define who will attack which User Stories, remember to use Git and GitHub for your collaborative needs, and have strong communication between you. 

Let's look at the requirements for this project. 

Requirements 

You must use only HTML, CSS & JS without any frameworks or libraries 

You must code your logic using functions in JavaScript  

You must use the box model to recreate as close as possible the look and feel of the cards 

You must use the Fetch API to interact with APIs 

You must use the following API to get the Pokémon’s info: https://pokeapi.co but feel free to research other APIs if you wish to get extra information about them 

Stories 

The Pokedex must have a container with a grid of 4x3 cards DONE

The Pokedex must have a card where the information for each Pokémon must live inside DONE

The Pokémon card must use Flexbox DONE

The Pokémon card must contain the following information: "name", "sprite", "types", "attack value", "hp", "defense value", "speed value" DONE

You have to choose 12 Pokémon (this can be chosen at random if you aren't familiar with the franchise) and show them at load time DONE

As a user, I must be redirected to its Poke Wiki entry when I click the name inside the card DONE

The Pokedex must include a search box where I can type the name of a Pokémon and its information must be the only Pokemon shown inside the grid DONE

The Pokedex must include a clickable element that will reset the search value and return to the 12 Pokémon you initially show DONE

The app should work and look fine in a 320px width viewport DONE
*/

let pokemonlist = document.querySelector("#pokemonlist"); //Selecting the container for all pokemons
let urlapi = "https://pokeapi.co/api/v2/pokemon/"; //Saving the url string in variable

function showAll(){
    pokemonlist.innerHTML = ""; //In case that container has something we clear it hear
    for(let i=1; i<13; i++){ //This for loop interates 12 times and the values of i goes from 1 to 12, then this value is concatenated to the url in order to obtain a single pokemon
        fetch(urlapi + i)
            .then((res)=>res.json())
            .then((data)=>showPokemon(data)) // here we execute the function show pokemon
    }
}

function showPokemon(data){
    const typearray = [];
    let types = data.types;
    for(let i=0; i<types.length; i++){
        let type = types[i];
        typearray.push(`<p class="${type.type.name} type">${type.type.name}</p>`);
    }

    const div = document.createElement("div"); // we create a div element wich contains all the follow html code with the different values of the API
    div.classList.add("pokemon");
    div.innerHTML = `
 
    <p class="pokemon-id-background">#${data.id}</p>
    <figure class="pokemon-img">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    </figure>
    <div class="pokemon-info">
        <div class="pokemon-container">
            <p class="pokemon-id">#${data.id}</p>
            <h2 class="pokemon-name"><a href="https://bulbapedia.bulbagarden.net/wiki/${data.name}_(Pok%C3%A9mon)" target="_blank">${data.name}</a></h2>
        </div>
        <div class="pokemon-type">
            ${typearray.join("")}
        </div>
        <div class="pokemon-stats">
            <p class="stat">Hp: ${data.stats[0].base_stat}</p>
            <p class="stat">Attack: ${data.stats[1].base_stat}</p>
            <p class="stat">Defense: ${data.stats[2].base_stat}</p>
            <p class="stat">Speed: ${data.stats[5].base_stat}</p>
        </div>
    </div>
    `;
    pokemonlist.append(div)
}
function filterPokemon(){ // we define the function to filter the items
    let searchform = document.querySelector("#search").value; // we get the value written on the formulary
    if(searchform.length>0){ 
        pokemonlist.innerHTML = "";  // we clear the content if it has something
        for(let i=1; i<13; i++){
        fetch(urlapi + i)
                .then((res)=>res.json()) // we evaluate if the name written in the formulary is the same of the pokemon name
                .then((data)=>{
                    if(data.name === searchform.toLowerCase()){ 
                        showPokemon(data);
                    }
                });
        }
    }
}
    
showAll(); // we show all pokemon when we first charge the page

