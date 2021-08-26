export type pokemonType = {
    name: string,
    picture: string,
    types: string[],
    orderNumber: number,
    abilities: string[],
    stats: {number: number, name: string}[],
    evolution: string[],
    // evolution: {name: string, image: string, id: number},       //evolution-chain/2
    moves: string[]
}


// get all pokemons
// TODO - limit is 20 - so add params for lazyloading or pagination
export const fetchAllPokemon = async ()=> {
    const response = await window.fetch('https://pokeapi.co/api/v2/pokemon', {
      method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        console.log(data)
        return data.results
    } else {
        console.log('error')
    }
}

export const fetchPokemon = async (id: number) => {
    const response = await window.fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: 'GET',
    })
    const data = await response.json()
    const evolutionOfPokemon = await getEvolutionChain(id)
    if (response.ok) {
        console.log(data)
        // TODO hier ein besseres Objekt zurückgeben -> nur die notwenigen Sachen, dafür aber alle
        const pokemon : pokemonType = {
            name: data.name,
            picture: data.sprites.front_default,
            types: data.types.map((type: { type: { name: string } }) => type.type.name),
            orderNumber: data.order,
            abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
            stats: data.stats.map((stat: { stat: { name: string }, base_stat: number }) => {return { number: stat.base_stat, name: stat.stat.name }} ),
            evolution: evolutionOfPokemon,
            moves: data.moves.map((move: { move: { name : string}}) => move.move.name)
        }

        console.log('+++++++++++++++++++++++')
        console.log(pokemon)
        return pokemon
    } else {
        console.log('error')
    }
}

// TODO fixen
const getEvolutionChain = async (id: number) => {
    const response = await window.fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`, {
      method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        console.log(data)
        console.log(data.chain)
        console.log(data.chain.species.name) // level 2
        console.log(data.chain.evolves_to[0].species.name) // level 3

        const species2 : string = data.chain.species.name
        const species3 : string = data.chain.evolves_to[0].species.name

        return [species2, species3]
    }
    else return ['']
}