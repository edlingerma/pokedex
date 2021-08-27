import React, { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { StyledCard, useStyles} from './style'


type CardProps = {
    name: string,
    picture: string
}

const Card = (props: CardProps) => {
    const { name, picture } = props
    const classes = useStyles();

    return (
        <StyledCard>
            <CardActionArea component={RouterLink} to={`/:${name}`}>
                <CardMedia
                    className={classes.media}
                    image={picture} 
                    title={`picture of ${name}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
}

export default memo(Card)