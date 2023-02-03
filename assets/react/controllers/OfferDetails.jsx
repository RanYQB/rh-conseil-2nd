import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(() => {
    return {

        offerDetail: {
            width: '45%',
            padding: '.8rem'
        },

    };
});


function OfferDetails(props) {
    const { offer } = props;
    const { classes } = useStyles()
    return (
        <Box sx={{ minWidth: 275 }} className={classes.offerDetail}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>

                        <Typography variant="h4" component="div">
                            { offer.title }
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Type de contrat : {offer.contractType}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Salaire mensuel : {offer.salary}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Nombre de postes à pourvoir : { offer.positions ? offer.positions : '1' }
                        </Typography>
                        <Typography variant="body2">
                            {offer.description}
                        </Typography>
                    </CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Publiée le : { offer.publishedAt }
                    </Typography>
                    <CardActions>
                        <Button size="small" variant='contained'>Postuler</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}
export default OfferDetails;