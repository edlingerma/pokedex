import React, { memo } from 'react'

import { Chip, Table, TableRow, TableCell } from '@material-ui/core'
import { InfoDiv, StyledAvatar, StyledTableContainer } from './style'

type basicInfoProps = {
	picture: string
	name: string
	orderNumber: number
	types: string[]
}

const Info = (props: basicInfoProps) => {
	const { picture, name, orderNumber, types } = props

	return (
		<InfoDiv>
			<StyledAvatar
				alt={`picture of ${name}`}
				src={picture}
				style={{ height: '200px', width: '200px' }}
			/>
			<StyledTableContainer>
				<Table aria-label='basic information table'>
					<tbody>
					<TableRow>
						<TableCell>Name:</TableCell>
						<TableCell>{name}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Number:</TableCell>
						<TableCell>{orderNumber}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Type(s):</TableCell>
						<TableCell>
							{types.map((type: string) => {
								return <Chip key={type} label={type} variant='outlined' />
							})}
						</TableCell>
					</TableRow>
					</tbody>
				</Table>
			</StyledTableContainer>
		</InfoDiv>
	)
}

export default memo(Info)
