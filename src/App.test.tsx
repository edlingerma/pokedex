import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { fetchPokemon, fetchPokemonData, fetchAllPokemon, pokemonType } from './utils/pokemonData'

window.scrollTo = jest.fn() // fixes Error: Not implemented: window.scrollTo

test('renders title', () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	)
	const title = screen.getByText('Pokédex')
	expect(title).toBeInTheDocument()
})

test('renders name in footer', () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	)
	const name = screen.getByText('Maria Edlinger')
	expect(name).toBeInTheDocument()
})

test('get a object with pokemon info of bulbasaur', async () => {
	const pokemonInfo = await fetchPokemon('bulbasaur')
	expect(typeof pokemonInfo).toBe('object');
})

test('cannot get pokemon info because name does not exist', async () => {
	const pokemonInfo = await fetchPokemon('foo')
	expect(typeof pokemonInfo).not.toBe('object');
})

test('check if all pokemon info of bulbasaur', async () => {
	const pokemonInfo = await fetchPokemon('bulbasaur')
	if (typeof pokemonInfo === 'object'){
		expect(pokemonInfo.name).toBe('bulbasaur');
		expect(pokemonInfo.picture).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
		expect(pokemonInfo.types[0]).toBe('grass');
		expect(pokemonInfo.types[1]).toBe('poison');
		expect(pokemonInfo.orderNumber).toBe(1);
		expect(pokemonInfo.stats[0].name).toBe('hp');
		expect(pokemonInfo.stats[0].number).toBe(45);
		expect(pokemonInfo.abilities[0]).toBe('overgrow');
		expect(pokemonInfo.moves[0]).toBe('razor-wind');
		expect(pokemonInfo.moves.length).toBe(78);
	}
})

test('check evolution of bulbasaur', async () => {
	const pokemonInfo = await fetchPokemon('bulbasaur')
	if (typeof pokemonInfo === 'object'){
		const evo  = pokemonInfo.evolution
		expect(evo[0].name).toBe('bulbasaur');
		expect(evo[1].name).toBe('ivysaur');
		expect(evo[2].name).toBe('venusaur');
	}
})

test('check special evolution of eevee', async () => {
	const pokemonInfo = await fetchPokemon('eevee')
	if (typeof pokemonInfo === 'object'){
		const evo  = pokemonInfo.evolution
		expect(evo[0].name).toBe('eevee');
		expect(evo[1].name).toBe('vaporeon');

		const specialEvo  = pokemonInfo.specialEvolution
		if(specialEvo) {
			expect(specialEvo[0].name).toBe('vaporeon');
			expect(specialEvo[1].name).toBe('jolteon');
			expect(specialEvo[2].name).toBe('flareon');
			expect(specialEvo[3].name).toBe('espeon');
			expect(specialEvo[4].name).toBe('umbreon');
			expect(specialEvo[5].name).toBe('leafeon');
			expect(specialEvo[6].name).toBe('glaceon');
			expect(specialEvo[7].name).toBe('sylveon');
		}
	}
})

test('get name and picture objects of pokemons for cards', async () => {
	const ditto = [{name: 'ditto', url: 'https://pokeapi.co/api/v2/pokemon-species/132/'}]
	const pokemonObjWithPic = await fetchPokemonData(ditto)
	expect(pokemonObjWithPic[0].picture).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg');
	expect(pokemonObjWithPic[0].name).toBe('ditto')
})

test('check response of first 20 pokemons', async function () {
	jest.setTimeout(30000);
	const response = await fetchAllPokemon(0)
	const count = response.count
	expect(count).toBe(1118);

	const twentyPokemons = response.pokemonData
	const firstName = twentyPokemons ? twentyPokemons[0].name : undefined
	const secondName = twentyPokemons ? twentyPokemons[1].name : undefined

	expect(twentyPokemons).toHaveLength(20)
	expect(firstName).toBe('bulbasaur');
	expect(secondName).toBe('ivysaur');
}, 30000)

