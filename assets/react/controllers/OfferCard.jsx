import React , { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Chip} from "@mui/material";


class OfferCard extends Component {

    render() {
        const { offer } = this.props;
        return (
            <Box sx={{minWidth: 275, cursor: 'pointer', marginBottom: '1rem'}} onClick={() => this.props.handleClick(offer)}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                { offer.title }
                            </Typography>
                            <Box>
                                <Chip label={ offer.contractType } size="small" variant="outlined" />
                                <Chip label={`${offer.salary}€/mois`} size="small" variant="outlined" />
                            </Box>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Publiée le {offer.publishedAt}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
        );
    }
}
export default OfferCard;