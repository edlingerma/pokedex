import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

import { Card, makeStyles } from '@material-ui/core'

export const StyledCard = withTheme(styled(Card)`
	width: 150px;
	margin: 5px;
	justify-content: center;
	align-items: center;
`)

export const useStyles = makeStyles({
	root: {
		maxWidth: 150,
	},
	media: {
		height: 120,
		width: 140,
		margin: 5,
	},
})
