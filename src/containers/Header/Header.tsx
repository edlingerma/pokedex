import React, { memo } from 'react'
import { HeaderDiv } from './style'
import { Link } from '@material-ui/core'

import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  return (
    <HeaderDiv>
      <Link href="/" color="secondary"><h1>Pokedex</h1></Link>
    </HeaderDiv>
  )
}

export default memo(Header)