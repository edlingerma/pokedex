import React, { memo, useState, useEffect  } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// import { HeaderDiv } from './style'
import { Button, IconButton } from '@material-ui/core'


import { fetchPokemon, fetchAllPokemon } from '../../utils/pokemonData'


const List = () => {

    const [allPokemons, setAllPokemons] = useState([{name: '', url: ''}])

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await fetchAllPokemon()
            setAllPokemons(pokemons)
            console.log('allPokemons')
            console.log(allPokemons)
        }
        fetchData()
    }, [])

    return (
    <>
        <h1>Liste</h1>
        <button 
            onClick={async () => {
                fetchPokemon(1)
        }}> Click me </button> 

        {allPokemons?.map((pokemon: {name: string, url: string}) => (
            <IconButton
                component={RouterLink}
                // get id of the pokemon
                to={`/:${pokemon.url.substring(pokemon.url.lastIndexOf('/', pokemon.url.lastIndexOf('/')-1) + 1, pokemon.url.lastIndexOf("/"))}`}
                aria-label={`/${pokemon.name}`}
                title="Hier deinen Ort bearbeiten"
            >
                {pokemon.name}
            </IconButton>
        ))}
    </>
    )
}

export default memo(List)