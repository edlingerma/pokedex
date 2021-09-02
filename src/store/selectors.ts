import { createSelector } from 'reselect'

import { PokedexState } from './types'

export const selectPokedex = (state: { pokedex: PokedexState }) => state.pokedex

export const selectPage = () =>
  createSelector(selectPokedex, (pokedex: PokedexState) => {
    return pokedex.page
  })

export const selectCurrentPokemons = () =>
  createSelector(selectPokedex, (pokedex: PokedexState) => {
    return pokedex.currentPokemons
  })

export const selectPokemonsNumber = () =>
  createSelector(selectPokedex, (pokedex: PokedexState) => {
    return pokedex.pokemonsNumber
  })
