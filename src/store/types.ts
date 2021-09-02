export type PokedexState = {
    page: number
    currentPokemons: { name: string; picture: string }[]
    pokemonsNumber: number
}