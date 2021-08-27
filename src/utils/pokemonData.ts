export type pokemonType = {
    name: string,
    picture: string,
    types: string[],
    orderNumber: number,
    abilities: string[],
    stats: {number: number, name: string}[],
    evolution: string[],
    // evolution: {name: string, picture: string}, 
    moves: string[]
}


// get all pokemons
// TODO - limit is 20 - so add params for lazyloading or pagination
export const fetchAllPokemon = async (offset: number) => {
    const response = await window.fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+offset, {
      method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        console.log(data)
        console.log(data.count)
        const pokemonData = await fetchPokemonData(data.results)
        console.log(pokemonData)
        return { ok: response.ok, pokemonData: pokemonData, count: data.count}
        // return data
    } else {
        console.log('error')
        return { ok: response.ok}
    }
}

export const fetchPokemon = async (name: string) => {
    const response = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        console.log(data)
        const evolutionOfPokemon = await getEvolutionChain(data.id)
        console.log('new')
        console.log(evolutionOfPokemon)
        const evolutionOfPokemonData = await fetchPokemonEvolutionData(evolutionOfPokemon)
        console.log('morePics')
        console.log(evolutionOfPokemonData)
        // picture: data.sprites.other.official-artwork.front_default,
        const pokemon : pokemonType = {
            name: data.name,
            picture: data.sprites.other.dream_world.front_default !== null ? 
                data.sprites.other.dream_world.front_default : data.sprites.front_default,
            types: data.types.map((type: { type: { name: string } }) => type.type.name),
            orderNumber: data.order,
            abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
            stats: data.stats.map((stat: { stat: { name: string }, base_stat: number }) => {return { number: stat.base_stat, name: stat.stat.name }} ),
            evolution: evolutionOfPokemon,
            moves: data.moves.map((move: { move: { name : string}}) => move.move.name)
        }
        return pokemon
    } else {
        console.log('error')
    }
}

const getEvolutionChain = async (id: number) => {
    const speciesResponse = await window.fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
      method: 'GET',
    })
    if (speciesResponse.ok) {
        const speciesData = await speciesResponse.json()
        const response = await window.fetch(speciesData.evolution_chain.url, {
            method: 'GET',
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            var evoChain = [];
            var evoData = data.chain;

            do {
                evoChain.push(evoData.species.name);
                evoData = evoData['evolves_to'][0];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

            return evoChain
        }
        else return []
    }
    else return []
}

const fetchPokemonData = async (objArr: {name: string, url: string}[]) => {
    const arr = []
    for(let i=0; i<objArr.length; i++) {
        const entry = await getPicture(objArr[i].name)
        if(entry) arr.push(entry)
    }
    return arr
}

const fetchPokemonEvolutionData = async (names: string[]) => {
    const arr = []
    for(let i=0; i<names.length; i++) {
        const entry = await getPicture(names[i])
        if(entry) arr.push(entry)
    }
    return arr
}

const getPicture = async (names: string) => {
    const response = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${names}`, {
            method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        const picture : string =  data.sprites.other.dream_world.front_default !== null ? 
        data.sprites.other.dream_world.front_default : data.sprites.front_default
        return {name: names, picture: picture}
    }
    return 
}