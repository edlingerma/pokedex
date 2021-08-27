import React, { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { StyledButton, useStyles } from './style'

const PokemonEggLink = (props: { name: string }) => {
    const { name } = props
    const classes = useStyles();

    return (
        <>
        <StyledButton
            component={RouterLink}
            to={`/:${name}`}
            aria-label={`/${name}`}
            title="Hier gibt es mehr Infos zu dem Pokémon"
            className={classes.pokemonEgg}
        >
            {name}
        </StyledButton>
        </>
    )
}

export default memo(PokemonEggLink)