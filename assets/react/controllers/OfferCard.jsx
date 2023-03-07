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
import moment from "moment";
import PersonIcon from '@mui/icons-material/Person';


const useStyles = makeStyles()(() => {
    return {
        isCurrentlySelected : {
            border: 'solid 2px #1abc9c'
        },
        offerCardPositions : {
            color: 'gray'
        },
        offerCardDescription: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: 14,
            fontWeight: 'normal'
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
                            <Typography variant="h4" component="div" sx={{marginTop: '1rem' , marginBottom: '.5rem'}}>
                                { offer.title }
                            </Typography>
                            <Typography variant="h6" component="div" sx={{marginTop: '.5rem' , marginBottom: '.5rem'}}>
                                { offer.recruiter.name }
                            </Typography>
                            <Typography variant="subtitle1" component="div" sx={{marginTop: '.5rem' , marginBottom: '.5rem'}}>
                                { offer.city.name } ({offer.city.departmentNumber})
                            </Typography>
                            <Box>
                                <Chip label={ offer.contractType } size="small"  variant="outlined" sx={{ marginRight: '.5rem', marginTop: '.5rem' , marginBottom: '.5rem', backgroundColor: '#f3f2f1'}} />
                                <Chip label={`${offer.salary}€/mois`} size="small"  variant="outlined" sx={{ backgroundColor: '#f3f2f1', marginTop: '.5rem' , marginBottom: '.5rem'}} />
                            </Box>
                            <Box sx={{marginTop: '.5rem' , marginBottom: '.5rem'}}>
                                <PersonIcon sx={{fill: '#1abc9c', verticalAlign: 'bottom', transform: 'translateX(-4px)'}}/>
                                <span className={classes.offerCardPositions}>Nombre de postes à pourvoir : {offer.positions}</span>
                            </Box>
                            <Box sx={{ marginTop: '.5rem' , marginBottom: '.5rem'}}>
                                <Typography variant="subtitle2" component="div" className={classes.offerCardDescription} color="text.secondary">
                                    { offer.description } )
                                </Typography>
                            </Box>
                            <Typography sx={{fontSize: 14, marginTop: '.5rem' , marginBottom: '.5rem'}} color="text.secondary" gutterBottom>
                                Publiée {moment(offer.publishedAt, "YYYY-MM-DD h:mm:ss").locale('fr').fromNow()}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
        </ThemeProvider>
    );
}
export default OfferCard;