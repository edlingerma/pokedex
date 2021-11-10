import React, { memo } from 'react'

import Card from '../Card'
import { Box, useTheme, useMediaQuery } from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import {
	EvolutionContainer,
	EvoDivWithSpecialCase,
	EvoSpecialCaseList,
} from './style'

type evolutionProps = {
	evolutionArr: {
		name: string
		picture: string
	}[]
	specialEvolutionArr?: {
		name: string
		picture: string
	}[]
}

const Evolution = (props: evolutionProps) => {
	const { evolutionArr, specialEvolutionArr } = props
	const evolutionArrLen = evolutionArr.length

	const theme = useTheme()
	const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'xl'))

	return (
		<EvoDivWithSpecialCase>
			<EvolutionContainer>
				{evolutionArr.map(
					(species: { name: string; picture: string }, i: number) => {
						if (evolutionArrLen === i + 1) {
							// last one
							return (
								<Card
									key={species.name}
									name={species.name}
									picture={species.picture}
								/>
							)
						} else {
							// not last one
							return (
								<>
									<Card
										key={species.name}
										name={species.name}
										picture={species.picture}
									/>
									{isLaptop ? (
										<ArrowRightAltIcon
											style={{
												height: '50px',
												width: '50px',
											}}
										/>
									) : (
										<ArrowDownwardIcon
											style={{
												height: '50px',
												width: '50px',
											}}
										/>
									)}
								</>
							)
						}
					}
				)}
			</EvolutionContainer>

			<EvoDivWithSpecialCase>
				<Box fontWeight='fontWeightBold'>
					{specialEvolutionArr
						? `This evolution is special. There are several ways in which the Pokemon can evolve:`
						: ''}
				</Box>
				<EvoSpecialCaseList>
					{specialEvolutionArr?.map(
						(species: { name: string; picture: string }) => {
							return (
								<Card
									key={species.name}
									name={species.name}
									picture={species.picture}
								/>
							)
						}
					)}
				</EvoSpecialCaseList>
			</EvoDivWithSpecialCase>
		</EvoDivWithSpecialCase>
	)
}

export default memo(Evolution)
