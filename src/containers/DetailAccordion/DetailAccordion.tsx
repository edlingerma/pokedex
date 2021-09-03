import React, { memo, ReactNode } from 'react'

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

type accordionProps = {
	name: string
	content: ReactNode
}

const DetailAccordion = (props: accordionProps) => {
	const { name, content } = props
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={name}
			>
				<Typography>{name}</Typography>
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
		</Accordion>
	)
}

export default memo(DetailAccordion)
