import React, { memo } from 'react'

import Card from '../Card'
import { useTheme, useMediaQuery } from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { EvolutionContainer } from './style'

type evolutionProps = {
    evolutionArr: {
        name: string,
        picture: string,
    }[]
}

const Evolution = (props: evolutionProps) => {
    const {evolutionArr} = props
    const evolutionArrLen = evolutionArr.length

    const theme = useTheme()
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'xl'))

    return (
        <EvolutionContainer>
        {evolutionArr.map((species, i) => {
            if (evolutionArrLen === i + 1) {
                // last one
                return (<Card name={species.name} picture={species.picture} />)
            } else {
                // not last one
                return (
                    <>
                        <Card name={species.name} picture={species.picture} />
                        {isLaptop ? 
                            <ArrowRightAltIcon style={{ height: '50px', width: '50px' }} /> :
                            <ArrowDownwardIcon style={{ height: '50px', width: '50px' }} />
                        }
                    </>
                )
            }
        })}
        </EvolutionContainer>
    )
}

export default memo(Evolution)