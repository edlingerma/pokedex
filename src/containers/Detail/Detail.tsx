import React, { memo, Suspense, lazy, useEffect, useState } from 'react'

import { fetchPokemon, pokemonType } from '../../utils/pokemonData'

import { Alert } from '@material-ui/lab'
import Enumeration from '../../components/Enumeration'
import Evolution from '../../components/Evolution'
import StatsTable from '../../components/StatsTable'
import DetailAccordion from '../DetailAccordion'

const Info = lazy(() => import('../../components/Info'))

type Props = {
	match: Record<string, any>
	test?: boolean
}

const Detail = (props: Props) => {
	const pokemonName = props.match.params.id

	const [pokemonInfo, setPokemonInfo] = useState<pokemonType>({
		name: '',
		picture: '',
		types: [''],
		abilities: [''],
		evolution: [{ name: '', picture: '' }],
		orderNumber: 0,
		moves: [''],
		stats: [{ number: 0, name: '' }],
	})
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('Ohoh')

	useEffect(() => {
		const fetchData = async () => {
			const pokemon = await fetchPokemon(pokemonName, props.test)
			if (typeof pokemon === 'string') {
				// error happend
				setError(true)
				setErrorMessage(pokemon)
			} else {
				setError(false)
				setPokemonInfo(pokemon)
			}
		}
		fetchData()
	}, [pokemonName])

	return (
		<>
			{error ? (
				<Alert variant='filled' severity='error'>
					This is an error alert — check it out!
					{errorMessage} — <strong>please try another pokemon</strong>
				</Alert>
			) : (
				<>
					<Suspense fallback={<div>Loading...</div>}>
						<Info
							picture={pokemonInfo.picture}
							name={pokemonInfo.name}
							orderNumber={pokemonInfo.orderNumber}
							types={pokemonInfo.types}
						/>
					</Suspense>

					<DetailAccordion
						name='stats'
						content={<StatsTable statsObjArr={pokemonInfo.stats} />}
					/>
					<DetailAccordion
						name='abilities'
						content={
							<Enumeration enumerables={pokemonInfo.abilities} />
						}
					/>
					{pokemonInfo.evolution.length > 0 ? (
						<DetailAccordion
							name='evolution'
							content={
								<Evolution
									evolutionArr={pokemonInfo.evolution}
									specialEvolutionArr={
										pokemonInfo?.specialEvolution
									}
								/>
							}
						/>
					) : (
						''
					)}
					{pokemonInfo.moves.length > 0 ? (
						<DetailAccordion
							name='moves'
							content={
								<Enumeration enumerables={pokemonInfo.moves} />
							}
						/>
					) : (
						''
					)}
				</>
			)}
		</>
	)
}

export default memo(Detail)
