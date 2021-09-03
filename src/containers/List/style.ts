import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

import Pagination from '@material-ui/lab/Pagination'

export const ListContainer = withTheme(styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`)

export const CardContainer = withTheme(styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
`)

export const StyledPagination = withTheme(styled(Pagination)`
	margin: 10px auto;
`)
