// padding: ${(props) => props.theme.spacing(12)}px 0
import { IconButton, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    pokemonEgg: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
    "&.MuiButtonBase-root": { 
        // backgroundColor: "red",
        background: "linear-gradient( 0deg, white, white 35%, black 35%, black 65%, red 65% )",
        color: "white",
        border: "5px solid black"
    }
  }
}));

export const StyledButton = withTheme(styled(IconButton)`
    border: 2px solid black;
    border-radius: 50%;
    height: 100px;
    width: 100px;
`)