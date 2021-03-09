import { makeStyles } from "@material-ui/core";
import { colors } from "shared/styles/theme";
import styled from "styled-components";

export const useStyles = makeStyles({
    root: {
        maxWidth: 342,
    },
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
        gridRowGap: '30px',
        '@media (min-width: 600px)': {
            gridTemplateColumns: '1fr 1fr 1fr',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
    },
    infoWrap: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0 4px 13px',
        alignItems: 'start',
    },
    actions: {
        padding: '16px 37.5px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    photo: {
        width: '100%',
        height: '215px',
    },
    title: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        color: colors.textPrimary,
    },
    info: {
        fontWeight: 500,
        fontSize: '10px',
        lineHeight: '12px',
        textTransform: 'uppercase',
        color: `rgba(${colors.textPrimary}, 0.87)`,
    },
    addPropertyBtnStyle: {
        height: '36px',
        color: `${colors.white} !important`,
        backgroundColor: `${colors.primary} !important`,
        fontSize: '12px',
        padding: '6px 16px',
        whiteSpace: 'nowrap',
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: `${colors.primary} !important`,
        },
    },
    photoWrap: {

    }
})

export const ImageWrap = styled.div<any>`
    max-width: 342px;
    height: 250px;
    img {
        width: 100%;
        height: 100%;
    }
`