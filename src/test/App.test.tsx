import { render } from '@testing-library/react'
import React  from 'react'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Card from '../components/Card/Card'
import { MemoryRouter } from 'react-router'
import { mockPokemon } from './mockdata'

window.scrollTo = jest.fn() // fixes Error: Not implemented: window.scrollTo

test('render header', () => {
	const header = render(
		<Header />
	)
	header.getByText('Pokédex')
})

test('render footer', () => {
	const footer = render(
		<Footer />
	)
	footer.getByText('Maria Edlinger')
})


test('render card with mockdata', async () => {
	const card = render(
		<MemoryRouter>
			<Card
				name={mockPokemon.name}
				picture={mockPokemon.picture}
			/>
		</MemoryRouter>
	);

	// check if name is there
	const name = card.getByText('bulbasaur')
	expect(name).toBeInTheDocument()

	// check if image is there
	const image = card.getByTitle(/picture of bulbasaur/);
	const backgroundImageURL = 'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg)'
	expect(image).toBeInTheDocument()
	const styleImgURL = image.style.backgroundImage
	expect(styleImgURL===backgroundImageURL).toBeTruthy()
})