import { Avatar, TableContainer, withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const InfoDiv = withTheme(styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`)

export const StyledAvatar = withTheme(styled(Avatar)`
    width: 500px;
    height: 500px;
`)

export const StyledTableContainer = withTheme(styled(TableContainer)`
    max-width: 50%;
    @media screen and (max-width: 768px) {
        max-width: 100%;
    }
`)


