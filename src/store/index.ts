import { pokedexReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		pokedex: pokedexReducer,
	},
})
