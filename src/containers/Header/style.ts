// padding: ${(props) => props.theme.spacing(12)}px 0
import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const HeaderDiv = withTheme(styled.div`
	width: 100%;
	margin: 0 auto;
	color: red;
`)
