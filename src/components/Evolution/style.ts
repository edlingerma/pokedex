import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const EvolutionContainer = withTheme(styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	@media screen and (max-width: 960px) {
		flex-direction: column;
	}
`)

export const EvoDivWithSpecialCase = withTheme(styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
`)

export const EvoSpecialCaseList = withTheme(styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`)
