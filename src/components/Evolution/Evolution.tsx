import React, { memo } from 'react'

import PokemonEggLink from '../PokemonEggLink'

type evolutionProps = {
    evolutionArr: string[],
}

const Evolution = (props: evolutionProps) => {
    const {evolutionArr} = props
    const evolutionArrLen = evolutionArr.length

    return (
        <>
        {evolutionArr.map((species, i) => {
            if (evolutionArrLen === i + 1) {
                // last one
                return (<PokemonEggLink name={species}/>)
            } else {
                // not last one
                return (
                    <>
                        <PokemonEggLink name={species}/>-------
                    </>
                )
            }
        })}
        </>
    )
}

export default memo(Evolution)