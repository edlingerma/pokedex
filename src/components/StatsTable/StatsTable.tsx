import React, { memo } from 'react'

import { TableContainer, Table, TableRow, TableCell } from '@material-ui/core';

type statsProps = {
    statsObjArr: {name: string, number: number}[],
}

const StatsTable = (props: statsProps) => {
    const { statsObjArr } = props
    return (
        <TableContainer>
            <Table aria-label="customized table">
                {statsObjArr.map(statObj => {
                    return (
                        <TableRow>
                            <TableCell>{statObj.name}</TableCell>
                            <TableCell>{statObj.number}</TableCell>
                        </TableRow>
                    )
                })}
            </Table>
        </TableContainer>
    )
}

export default memo(StatsTable)