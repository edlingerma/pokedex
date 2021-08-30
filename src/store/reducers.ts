import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'
import { setPage, setCurrentPokemons, resetUI, ActionsType } from './actions'
import { PokedexState } from './types'

export const initialState: PokedexState = {
  page: 1,
  currentPokemons: [],
}

// export default produce(
export const pokedexReducer = produce(
  (draft: Draft<PokedexState> = initialState, action: ActionsType) => {
    switch (action.type) {
      case getType(setPage): {
        const { page } = action.payload
        draft.page = page
        return draft
      }
      case getType(setCurrentPokemons): {
        const { currentPokemons } = action.payload
        draft.currentPokemons = currentPokemons
        return draft
      }
      case getType(resetUI): {
        draft = initialState
        return draft
      }
      default:
        return draft
    }
  }
)
