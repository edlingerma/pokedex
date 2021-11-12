import '@testing-library/jest-dom'
import React  from 'react'
import {
	render,
	waitFor,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { mockPokemon } from './mockdata'
import Detail from '../containers/Detail'
import Enumeration from '../components/Enumeration'
import Evolution from '../components/Evolution'
import Info from '../components/Info'
import StatsTable from '../components/StatsTable'

const matchProp = {
	params: {
		id: 'bulbasaur'
	}
}

test('render detail page without info and content', async () => {
	const detailPage = render(
		// without MemoryRouter following error: "Invariant failed: You should not use <Link> outside a <Router>"
		<MemoryRouter>
			<Detail match={matchProp}/>
		</MemoryRouter>
	)
	// check if lazy loader is displayed
	const infoRender = detailPage.getByText('Loading...')
	expect(infoRender).toBeInTheDocument()
	// check if Detailpage Accordions are displayed
	// error happens when getByText did not find anything or more than one
	const statsLabel = detailPage.getByText('stats')
	const abilitiesLabel = detailPage.getByText('abilities')
	const evolutionLabel = detailPage.getByText('evolution')
	const movesLabel = detailPage.getByText('moves')
	// double check (for practise - not necessary)
	expect(statsLabel).toBeInTheDocument()
	expect(abilitiesLabel).toBeInTheDocument()
	expect(evolutionLabel).toBeInTheDocument()
	expect(movesLabel).toBeInTheDocument()
})

test('render pokemon detailPage with mockdata', async () => {
	const detailPage = render(
		// without MemoryRouter following error: "Invariant failed: You should not use <Link> outside a <Router>"
		<MemoryRouter>
			<Detail match={matchProp} test={true}></Detail>
		</MemoryRouter>
	);

	// check if fold out of Stats Accordion works
	const statsLabel = detailPage.getByText('stats')
	// class of arrow of accordion when it is open
	let accordionClass = document.querySelector('.MuiAccordionSummary-expandIcon.Mui-expanded')
	// arrow not there because the accordion is closed
	expect(accordionClass).toBe(null)
	// better use not.toBeInTheDocument and not toBe(null)
	expect(accordionClass).not.toBeInTheDocument()

	// fold out accordion
	statsLabel.click()
	// check same class again to see if accordion is fold out yet and the arrow exists
	accordionClass = document.querySelector('.MuiAccordionSummary-expandIcon.Mui-expanded')
	expect(accordionClass).toBeTruthy()

	// check if stats table exists
	const statsDiv = document.querySelector('#stats')
	expect(statsDiv).toBeTruthy()
	// check if stats table has input
	await waitFor(() => {
		expect(detailPage.getByText('hp')).toBeTruthy()
		expect(detailPage.getAllByText('45')[0]).toBeTruthy()
		expect(detailPage.getByText('defense')).toBeTruthy()
	});

	// check if other accordions are there
	// abilities
	detailPage.getByText('abilities')
	const abilitiesDiv = document.querySelector('#abilities')
	expect(abilitiesDiv).toBeTruthy()
	// evolution
	detailPage.getByText('evolution')
	const evolutionDiv = document.querySelector('#evolution')
	expect(evolutionDiv).toBeTruthy()
	// moves
	detailPage.getByText('moves')
	const movesDiv = document.querySelector('#moves')
	expect(movesDiv).toBeTruthy()
})


test('render info of pokemon with mockdata', async () => {
	const info = render(
		<Info
			picture={mockPokemon.picture}
			name={mockPokemon.name}
			orderNumber={mockPokemon.orderNumber}
			types={mockPokemon.types}
		/>
	);
	// check if Name label and name of pokemon is there
	info.getByText('Name:')
	info.getByText('bulbasaur')
})



test('render stats table with mockdata', async () => {
	const stats = render(
		<StatsTable
			statsObjArr={mockPokemon.stats}
		/>
	);


	// check if rows are filled with correct mockdata
	const rows = stats.getAllByRole('row')
	expect(rows).toHaveLength(6)

	// check if first row in table has cell content " hp | 45 "
	expect(rows[0].children[0].innerHTML === 'hp').toBeTruthy()
	expect(rows[0].children[1].innerHTML === '45').toBeTruthy()
	// check if 4th row in table has cell content " special-attack | 65 "
	expect(rows[3].children[0].innerHTML === 'special-attack').toBeTruthy()
	expect(rows[3].children[1].innerHTML === '65').toBeTruthy()
	// check if last row in table has cell content " speed | 45 "
	expect(rows[rows.length - 1].children[0].innerHTML === 'speed').toBeTruthy()
	expect(rows[rows.length - 1].children[1].innerHTML === '45').toBeTruthy()
})

test('render abilities enumeration with mockdata', async () => {
	const abilities = render(
		<Enumeration
			enumerables={mockPokemon.abilities}
		/>
	);

	// check if all abilities are there with correct mockdata
	abilities.getByText('overgrow, chlorophyll')
})

test('render moves enumeration with mockdata', async () => {
	const moves = render(
		<Enumeration
			enumerables={mockPokemon.moves}
		/>
	);

	// check if move div is there with correct mockdata
	// use Regex to find String partials
	// get div by checking for one of the moves
	const movesDiv = moves.getByText(/razor-wind/)
	const allMoves = movesDiv.innerHTML
	const allMovesArr = movesDiv.innerHTML.split(', ')
	expect(allMovesArr).toHaveLength(78)

	// check for some moves
	expect(allMovesArr[0] === 'razor-wind').toBeTruthy()
	expect(allMovesArr[allMovesArr.length - 1] === 'confide').toBeTruthy()
	expect(allMovesArr[42] === 'charm').toBeTruthy()
	expect(allMovesArr.includes('skull-bash')).toBeTruthy()
	expect(allMovesArr.includes('toxic')).toBeTruthy()
	// check if last character isnot a comma
	expect(allMoves[allMoves.length - 1] != ',').toBeTruthy()
})


test('render evolution with mockdata', async () => {
	const evolutionContainer = render(
		<MemoryRouter>
			<Evolution
				evolutionArr={mockPokemon.evolution}
			/>
		</MemoryRouter>
	);

	// check if all evolutions are there
	evolutionContainer.getByText('bulbasaur')
	evolutionContainer.getByText('ivysaur')
	evolutionContainer.getByText('venusar')

	// check if the evolution order is correct
	const allEvaluationNames =  document.querySelectorAll("h2")
	// other possible query to get all h2 headings:
	evolutionContainer.getAllByRole('heading', { level: 2 })
	expect(allEvaluationNames[0].innerHTML === 'bulbasaur').toBeTruthy()
	expect(allEvaluationNames[1].innerHTML === 'ivysaur').toBeTruthy()
	expect(allEvaluationNames[2].innerHTML === 'venusar').toBeTruthy()
})
