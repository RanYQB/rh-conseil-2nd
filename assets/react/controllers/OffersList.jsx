import * as React from 'react';
import OfferDetails from "./OfferDetails";
import OfferCard from "./OfferCard";
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(() => {
    return {
        root: {
            width: '80%',
            margin: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        offersList: {
            width: '45%',
            padding: '.8rem'
        },

    };
});


function OffersList (props) {
    const { classes } = useStyles();
    const { offers , selected } = props;
    return (
        <div className={classes.root}>
            <div className={classes.offersList}>
                { offers.map( o => ( <OfferCard handleClick={props.handleClick} key={o.id} offer={o}/>))}
            </div>
            <OfferDetails offer={ selected } className={ classes.offerDetail} />
        </div>
    )
}
export default OffersList;