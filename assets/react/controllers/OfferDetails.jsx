import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./theme";


const useStyles = makeStyles()(() => {
    return {
        offerDetail: {

            minWidth: 275
        },
    };
});

function OfferDetails(props) {
    const [ fixed , setFixed ] = useState(false);
    const { offer } = props;
    const { classes } = useStyles();
    function setToFixed() {
        if(window.scrollY >= 150){
            setFixed(true);
        } else {
            setFixed(false)
        }
    }
    window.addEventListener('scroll', setToFixed)

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={ fixed === true ? { position: 'fixed', left: '51%',
                top: '90px', width: '43.5%'} : {position : 'static', width: '49%'}} className={classes.offerDetail}>
                <Card variant="outlined">
                    {offer &&
                        <React.Fragment>
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {offer.title}
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Type de contrat : {offer.contractType}
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Salaire mensuel : {offer.salary}
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Nombre de postes à pourvoir : {offer.positions ? offer.positions : '1'}
                                </Typography>
                                <Typography variant="body2">
                                    {offer.description}
                                </Typography>
                            </CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Publiée le : {offer.publishedAt}
                            </Typography>
                            <CardActions>
                                <Button size="small" color='success' variant='contained'>Postuler</Button>
                            </CardActions>
                        </React.Fragment>
                    }
                </Card>
            </Box>
        </ThemeProvider>
    );
}
export default OfferDetails;