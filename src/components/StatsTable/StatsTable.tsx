import React, { memo } from 'react'

import { TableContainer, Table, TableRow, TableCell } from '@material-ui/core'

type statsProps = {
	statsObjArr: { name: string; number: number }[]
}

const StatsTable = (props: statsProps) => {
	const { statsObjArr } = props
	return (
		<TableContainer>
			<Table aria-label='customized table'>
				<tbody>
				{statsObjArr.map(
					(statObj: { name: string; number: number }) => {
						return (
							<TableRow key={statObj.name}>
								<TableCell>{statObj.name}</TableCell>
								<TableCell>{statObj.number}</TableCell>
							</TableRow>
						)
					}
				)}
				</tbody>
			</Table>
		</TableContainer>
	)
}

export default memo(StatsTable)
