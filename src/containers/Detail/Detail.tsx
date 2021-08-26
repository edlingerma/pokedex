import React, { memo, useEffect, useState } from 'react'
// import { HeaderDiv } from './style'
import { fetchPokemon, pokemonType } from '../../utils/pokemonData'


type Props = {
  match: Record<string, any>
}

const Detail = (props: Props) => {
  const pokemonIDstring = props.match.params.id
  console.log(props)
  const pokemonID :number = pokemonIDstring.substring(1);
  

  const [pokemonInfo, setPokemonInfo] = useState({name: '', picture: '', types: [''], abilities: [''], evolution: [''], orderNumber: 0, moves: [''], stats: [{number:0,name: ''}]})
  
  useEffect(() => {
    const fetchData = async () => {
        const pokemon = await fetchPokemon(pokemonID)
        if(pokemon) setPokemonInfo(pokemon)
        console.log('-----------Info--------')
        // console.log(pokemon)
        console.log(pokemonInfo)
    }
    fetchData()
  }, [])


  return (
      <>
      <h1>Detail</h1>
      <h2>{pokemonInfo.name}</h2>
      <p>{pokemonInfo.picture}</p>
      <p>{pokemonInfo.types}</p>
      <p>{pokemonInfo.abilities}</p>
      <p>{pokemonInfo.orderNumber}</p>
      <p>{pokemonInfo.moves}</p>
      <p>{pokemonInfo.evolution}</p>
      <p>{pokemonInfo.stats[0].name}: {pokemonInfo.stats[0].number}</p>
      </>
  )
}

export default memo(Detail)