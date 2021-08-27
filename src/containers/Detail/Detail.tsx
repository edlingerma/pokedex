import React, { memo, Suspense, lazy, useEffect, useState } from 'react'

import { fetchPokemon } from '../../utils/pokemonData'

import Enumeration from '../../components/Enumeration'
import Evolution from '../../components/Evolution'
// import Info from '../../components/Info'
import StatsTable from '../../components/StatsTable'
import DetailAccordion from '../DetailAccordion'

const Info = lazy(() => import('../../components/Info'))


type Props = {
  match: Record<string, any>
}

const Detail = (props: Props) => {
  const pokemonIDstring = props.match.params.id
  console.log(props)
  const pokemonName : string = pokemonIDstring.substring(1);
  

  const [pokemonInfo, setPokemonInfo] = useState({name: '', picture: '', types: [''], abilities: [''], evolution: [''], orderNumber: 0, moves: [''], stats: [{number:0,name: ''}]})
  
  useEffect(() => {
    const fetchData = async () => {
        const pokemon = await fetchPokemon(pokemonName)
        if(pokemon) setPokemonInfo(pokemon)
        console.log('-----------Info--------')
        // console.log(pokemon)
        console.log(pokemonInfo)
    }
    fetchData()
  }, [pokemonName])


  return (
      <>
      <Suspense fallback={<div>Loading...</div>}>
        <Info
          picture={pokemonInfo.picture}
          name={pokemonInfo.name}
          orderNumber={pokemonInfo.orderNumber}
          types={pokemonInfo.types}
        />
      </Suspense>

      <DetailAccordion
        name='stats'
        content={
          <StatsTable
            statsObjArr={pokemonInfo.stats}
          />}
      />
      <DetailAccordion
        name='abilities'
        content={
          <Enumeration 
            enumerables={pokemonInfo.abilities}
        />}
      />
      {pokemonInfo.evolution.length > 0 ?
        (
          <DetailAccordion
            name='evolution'
            content={
              <Evolution
                evolutionArr={pokemonInfo.evolution}
            />}
          />
        ) : ''
      }
      {pokemonInfo.moves.length > 0 ?
        ( 
        <DetailAccordion
          name='moves'
          content={
            <Enumeration 
              enumerables={pokemonInfo.moves}
          />}
        />
        ) : ''
      }
      </>
  )
}

export default memo(Detail)