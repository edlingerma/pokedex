import React, { memo } from 'react'

import Card from '../Card'

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
        <>
        {evolutionArr.map((species, i) => {
            if (evolutionArrLen === i + 1) {
                // last one
                return (<Card name={species.name} picture={species.picture} />)
            } else {
                // not last one
                return (
                    <>
                        <Card name={species.name} picture={species.picture} />
                        -------
                    </>
                )
            }
        })}
        </>
    )
}

export default memo(Evolution)