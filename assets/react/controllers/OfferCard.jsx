import React , { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Chip} from "@mui/material";
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import {makeStyles} from "tss-react/mui";


const useStyles = makeStyles()(() => {
    return {
        isCurrentlySelected : {
            border: 'solid 1px #1abc9c'
        }

    }
});

function OfferCard (props) {
    const { classes } = useStyles();
    const { offer, selected } = props;
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{minWidth: 275, cursor: 'pointer', marginBottom: '1rem'}} className={ selected === offer.id && classes.isCurrentlySelected } onClick={() => props.handleClick(offer)}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                { offer.title }
                            </Typography>
                            <Box>
                                <Chip label={ offer.contractType } size="small" color='success' variant="outlined" sx={{ marginRight: '.5rem'}} />
                                <Chip label={`${offer.salary}€/mois`} size="small" color='success' variant="outlined" />
                            </Box>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Publiée le {offer.publishedAt}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
export default OfferCard;