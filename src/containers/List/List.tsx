import React, { memo, useState, useEffect  } from 'react'

import { CardContainer, ListContainer, StyledPagination } from './style'

import Card from '../../components/Card'
import { fetchAllPokemon } from '../../utils/pokemonData'

const List = () => {

    const [allPokemons, setAllPokemons] = useState([{name: '', picture: ''}])
    const [numberOfPokemons, setNumberOfPokemons] = useState(200)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const { ok, pokemonData, count} = await fetchAllPokemon((page-1)*20)
            if(ok && pokemonData){
                setAllPokemons(pokemonData)
                if(count) setNumberOfPokemons(count)
            }
        }
        fetchData()
    }, [page])

    const changePage = (value: number) => {
        setPage(value)
    }

    return (
    <ListContainer>
        <CardContainer>
        {allPokemons?.map((pokemon: {name: string, picture: string}) => (
            <Card name={pokemon.name} picture={pokemon.picture} />
        ))}
        </CardContainer>
        <StyledPagination 
            count={Math.ceil(numberOfPokemons/20)} 
            // TODO: change any to Change Type
            onChange={(e: any, value: number) => {
                changePage(value)
            }}
        />
    </ListContainer>
    )
}

export default memo(List)