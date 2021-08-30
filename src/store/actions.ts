import { ActionType, createAction } from 'typesafe-actions'

export const setPage = createAction('SET_PAGE')<{
    page: number
}>()

export const setCurrentPokemons = createAction('SET_CURRENT_POKEMONS')<{
    currentPokemons: { name: string; picture: string }[]
}>()

export const resetUI = createAction('RESET_UI')()

export const Actions = {
    setPage,
    setCurrentPokemons,
    resetUI,
}

export type ActionsType = ActionType<typeof Actions>
