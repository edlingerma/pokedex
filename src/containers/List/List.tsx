import React, { ChangeEvent, memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectPage,
	selectCurrentPokemons,
	selectPokemonsNumber,
} from '../../store/selectors'
import {
	setPage,
	setCurrentPokemons,
	setPokemonsNumber,
} from '../../store/actions'

import { CardContainer, ListContainer, StyledPagination } from './style'

import Card from '../../components/Card'
import { fetchAllPokemon } from '../../utils/pokemonData'

const List = () => {
	const dispatch = useDispatch()
	const currentPage = useSelector(selectPage())
	const currentPokemons = useSelector(selectCurrentPokemons())
	const numberOfAllPokemons = useSelector(selectPokemonsNumber())
	const [pageNumber, setPageNumber] = useState(currentPage)
	const [allPokemons, setAllPokemons] = useState(currentPokemons)
	const [numberOfPokemons, setNumberOfPokemons] =
		useState(numberOfAllPokemons)

	useEffect(() => {
		const fetchData = async () => {
			if (pageNumber !== currentPage || currentPokemons.length === 0) {
				dispatch(setPage({ page: pageNumber }))
				const { ok, pokemonData, count } = await fetchAllPokemon(
					(pageNumber - 1) * 20
				)
				if (ok && pokemonData) {
					setAllPokemons(pokemonData)
					dispatch(
						setCurrentPokemons({ currentPokemons: pokemonData })
					)
					window.scrollTo(0, 0)
					if (count) {
						setNumberOfPokemons(count)
						dispatch(setPokemonsNumber({ pokemonsNumber: count }))
					}
				}
			}
		}
		fetchData()
	}, [dispatch, currentPage, pageNumber, currentPokemons.length])

	const changePage = (value: number) => {
		setPageNumber(value)
	}

	return (
		<ListContainer>
			<CardContainer>
				{allPokemons?.map(
					(pokemon: { name: string; picture: string }) => (
						<Card key={pokemon.name} name={pokemon.name} picture={pokemon.picture} />
					)
				)}
			</CardContainer>
			<StyledPagination
				count={Math.ceil(numberOfPokemons / 20)}
				onChange={(
					e: ChangeEvent<HTMLButtonElement>,
					value: number
				) => {
					changePage(value)
				}}
				page={currentPage}
			/>
		</ListContainer>
	)
}

export default memo(List)
