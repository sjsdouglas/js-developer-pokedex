const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

// function convertPokemonToLi(pokemon) {
//     return `
//         <li class="pokemon ${pokemon.type}">
//             <span class="number">#${pokemon.number}</span>
//             <span class="name">${pokemon.name}</span>

//             <div class="detail">
//                 <ol class="types">
//                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
//                 </ol>
//                 <img src="${pokemon.photo}" alt="${pokemon.name}">
//             </div>
//         </li>
//     `
// }

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}"></img>
            </div>

            <div class="description hidden">
                <ol class="descriptionList">
                    ${pokemon.stats.map((stat) => `
                    <li class="stat ${stat.label}">
                        <div class="info">
                            <span class="label">${stat.label}</span> <span class="value">${stat.value}</span>
                        </div>
                        <div class="bar"><div style="width: ${stat.value}%;"></div></div>
                    </li>`).join('')}
                <ol>
            </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }).then(() => {
        const cardPokemon = document.querySelectorAll('.pokemon')
        cardPokemon.forEach((card) => {
            card.addEventListener('click', (event) => {
                const target = event.target.closest('li');
                const description = target.querySelector('.description');
                description.classList.toggle('hidden');
                target.classList.toggle('active');
            })
        });

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})