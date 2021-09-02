import { ActionType, createAction } from 'typesafe-actions'

export const setPage = createAction('SET_PAGE')<{
    page: number
}>()

export const setCurrentPokemons = createAction('SET_CURRENT_POKEMONS')<{
    currentPokemons: { name: string; picture: string }[]
}>()

export const setPokemonsNumber = createAction('SET_POKEMONS_NUMBER')<{
    pokemonsNumber: number
}>()

export const resetUI = createAction('RESET_UI')()

export const Actions = {
    setPage,
    setCurrentPokemons,
    setPokemonsNumber,
    resetUI,
}

export type ActionsType = ActionType<typeof Actions>
