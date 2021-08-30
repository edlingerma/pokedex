import React, { ChangeEvent, memo, useState, useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage, selectCurrentPokemons } from '../../store/selectors'
import { setPage, setCurrentPokemons } from '../../store/actions'

import { CardContainer, ListContainer, StyledPagination } from './style'

import Card from '../../components/Card'
import { fetchAllPokemon } from '../../utils/pokemonData'

const List = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(selectPage())
    const currentPokemons = useSelector(selectCurrentPokemons())
    const [pageNumber, setPageNumber] = useState(currentPage)
    const [allPokemons, setAllPokemons] = useState(currentPokemons)
    // const [allPokemons, setAllPokemons] = useState([{name: '', picture: ''}])
    const [numberOfPokemons, setNumberOfPokemons] = useState(20)

    useEffect(() => {
        const fetchData = async () => {
            const { ok, pokemonData, count} = await fetchAllPokemon((pageNumber-1)*20)
            if(ok && pokemonData){
                setAllPokemons(pokemonData)
                dispatch(setCurrentPokemons({ currentPokemons: pokemonData }))
                window.scrollTo(0, 0)
                if(count) setNumberOfPokemons(count)
            }
        }
        fetchData()
    }, [pageNumber])

    const changePage = (value: number) => {
        setPageNumber(value)
        dispatch(setPage({ page: value }))
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
            onChange={(e: ChangeEvent<HTMLButtonElement>, value: number) => {
                changePage(value)
            }}
            page={pageNumber} 
        />
    </ListContainer>
    )
}

export default memo(List)