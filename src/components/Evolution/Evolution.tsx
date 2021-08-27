import React, { memo } from 'react'

import Card from '../Card'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
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
                        <ArrowRightAltIcon style={{ height: '50px', width: '50px' }} />
                    </>
                )
            }
        })}
        </EvolutionContainer>
    )
}

export default memo(Evolution)