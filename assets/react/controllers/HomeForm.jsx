import * as React from 'react';
import {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import theme from './theme';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import HomeContent from "./HomeContent";
import axios from "axios";
import AutoComplete from './AutoComplete'


const useStyles = makeStyles()(() => {
    return {
        root: {
            width: '100%',
            maxWidth: '1200px',
            margin: 'auto',
            padding: '1.5rem'
        },
        formPaper: {
            width: 'initial',
            marginBottom: '2rem',
            padding: '1.5rem',
        },
        formContent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 'inherit'
        },
        formButton: {
            width: '10%'
        },
        formKeywordInput: {
            width: '42%',
        },
    }
});


function HomeForm () {
    const {classes} = useStyles()
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(true);
    const [offers, setOffers] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        axios.get('/api/offers')
            .then(response => {
                const offers = response.data['hydra:member'];
                console.log(response.data['hydra:member'][0])
                setOffers(offers)
                setSelected(response.data['hydra:member'][0])
            })
            .catch(err => {
                const errorMessage = "Error: " + err.message;
                console.log(errorMessage);
            })
        setLoading(false);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.get(`/api/offers?page=1&title=${keyword}`)
            .then(response => {
                const offers = response.data['hydra:member'];
                console.log(response.data['hydra:member'][0])
                setOffers(offers)
                setSelected(response.data['hydra:member'][0])
            })
            .catch(err => {
                const errorMessage = "Error: " + err.message;
                console.log(errorMessage);
            })
        setLoading(false);
    }

    const handleChange = (e) => {
        setKeyword(
            e.target.value
        )
    }

    const handleClick = (offer) => {
        setSelected(offer)
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{position: 'relative', top: '65px'}} className={classes.root}>
                <Paper variant="outlined" className={classes.formPaper}>
                    <form onSubmit={handleSubmit} className={classes.formContent}>
                        <TextField id="outlined-basic" value={keyword} name='keyword'
                                   className={classes.formKeywordInput} onChange={handleChange} label="Métier"
                                   variant="outlined" size='small' color='success'/>
                        <AutoComplete/>
                        <Button type='submit' variant='contained' color='success' size="small"
                                className={classes.formButton}>Rechercher</Button>
                    </form>
                </Paper>
                <HomeContent offers={offers} selected={selected} handleClick={handleClick}/>
            </div>
            } </ThemeProvider>
    );
}
export default HomeForm;