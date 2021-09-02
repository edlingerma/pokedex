export type pokemonType = {
    name: string,
    picture: string,
    types: string[],
    orderNumber: number,
    abilities: string[],
    stats: {number: number, name: string}[],
    evolution: {name: string, picture: string}[], 
    specialEvolution?: {name: string, picture: string}[],
    moves: string[]
}

// get all pokemons
export const fetchAllPokemon = async (offset: number) => {
    const response = await window.fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset='+offset, {
      method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        const pokemonData = await fetchPokemonData(data.results)
        return { ok: response.ok, pokemonData: pokemonData, count: data.count}
    } else {
        return { ok: response.ok}
    }
}

// get data for one pokemon by name
export const fetchPokemon = async (name: string) => {
    try { 
        const response = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            method: 'GET',
        })
        const data = await response.json()

        if (response.ok) {
            const [evoOfPokemonData, specialEvoOfPokemonData ]  = await getEvolutionChain(data.species.url, name)
            // const evolutionOfPokemon = await getEvolutionChain(data.species.url)
            const evolutionOfPokemonData = await fetchPokemonEvolutionData(evoOfPokemonData)
            const specialEvolutionOfPokemonData = (specialEvoOfPokemonData.length>0) ? await fetchPokemonEvolutionData(specialEvoOfPokemonData) : undefined
            const pokemon : pokemonType = {
                name: data.name,
                picture: data.sprites.other.dream_world.front_default !== null ? 
                    data.sprites.other.dream_world.front_default : data.sprites.front_default,
                types: data.types.map((type: { type: { name: string } }) => type.type.name),
                orderNumber: data.order,
                abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
                stats: data.stats.map((stat: { stat: { name: string }, base_stat: number }) => {return { number: stat.base_stat, name: stat.stat.name }} ),
                evolution: evolutionOfPokemonData,
                specialEvolution: specialEvolutionOfPokemonData,
                moves: data.moves.map((move: { move: { name : string}}) => move.move.name)
            }
            return pokemon
        } else {
            return 'Ups! Something went wrong :('
        }
    } catch (err) {
        return 'Ups! Something went wrong :('
    }
}

// get evolution chain
const getEvolutionChain = async (speciesUrl: string, name: string) => {
    const speciesResponse = await window.fetch(speciesUrl, {
      method: 'GET',
    })
    if (speciesResponse.ok) {
        const speciesData = await speciesResponse.json()
        const response = await window.fetch(speciesData.evolution_chain.url, {
            method: 'GET',
        })

        if (response.ok) {
            const data = await response.json()
            let evoChain : string[] = [];
            let evoData = data.chain;
            let specialEvoChain : string[] = []
            let nextEvoIndex : number = 0

            do {
                evoChain.push(evoData.species.name);
                // if and loop for special case: Pokemon eevee
                if(evoData['evolves_to'].length > 1){
                    // evoData['evolves_to'].map(( evoPokemon: { species: { name: string } }, i: number ) => {
                    //     specialEvoChain.push(evoPokemon.species.name)
                    // })
                    for(let i=0; i<evoData['evolves_to'].length; i++){
                        if( name===evoData['evolves_to'][i].species.name){
                            nextEvoIndex = i
                         } else 
                        specialEvoChain.push(evoData['evolves_to'][i].species.name)
                    }
                } 
                evoData = evoData['evolves_to'][nextEvoIndex];
            } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
            return [evoChain, specialEvoChain]
        }
        else return []
    }
    else return []
}

// fetch additional Data (pictures) for List
const fetchPokemonData = async (objArr: {name: string, url: string}[]) => {
    const arr = []
    for(let i=0; i<objArr.length; i++) {
        const entry = await getPicture(objArr[i].name)
        if(entry) arr.push(entry)
    }
    return arr
}

// fetch additional Data (pictures) for Evolution
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