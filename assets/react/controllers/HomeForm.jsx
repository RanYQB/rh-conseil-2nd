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


const useStyles = makeStyles()(() => {
    return {
        root: {
            width: '80%'
        }

    }
});


function HomeForm () {
    const { classes } = useStyles()
    const [ keyword , setKeyword ] = useState('')
    const [ loading, setLoading ] = useState(true);
    const [ offers, setOffers ] = useState([]);
    const [ selected , setSelected ] = useState('');

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
        setSelected( offer )
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{position: 'relative', top: '65px'}}>
            <Paper variant="outlined" className={classes.root} >
                <form onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" value={keyword} name='keyword' onChange={handleChange} label="Outlined" variant="outlined" size='small' color='success'/>
                    <Button type='submit' variant='contained' color='success'>Rechercher</Button>
                </form>
            </Paper>
            <HomeContent offers={offers} selected={selected} handleClick={handleClick}/>
            </div>
        </ThemeProvider>
    );
}

export default HomeForm;