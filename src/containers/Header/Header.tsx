import React, { memo } from 'react'
import { HeaderDiv } from './style'

const Header = () => {
  return (
    <HeaderDiv>
      <h1>Pokedex</h1>
    </HeaderDiv>
  )
}

export default memo(Header)