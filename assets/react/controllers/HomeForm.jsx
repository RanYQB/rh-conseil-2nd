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
    const [options, setOptions] = useState([]);
    const [ textInput, setTextInput ] = useState('');
    const [open, setOpen] = useState(false);
    const [ selectedCity, setSelectedCity] = useState('');


    function handleInputChange(event){
        setTextInput(event.target.value)
        setOptions([])
        axios.get(`/api/cities?name=${textInput}`)
            .then(response => {
                const cities = response.data['hydra:member'];
                console.log(response.data['hydra:member'][0])
                const optionsArray = []
                cities.forEach(city =>
                    optionsArray.push({
                        id: city.id,
                        name: city.name,
                        departmentNumber : city.departmentNumber,
                        label: `${city.name} (${city.departmentNumber})`
                    })
                )
                setOptions(optionsArray);
                console.log(optionsArray)
                // setTextInput('1')
            })
            .catch(err => {
                const errorMessage = "Error: " + err.message;
                console.log(errorMessage);
            })

    }

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

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


    const handleCitySelect = (newValue) => {
        setSelectedCity(newValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.get(`/api/offers?page=1&title=${keyword}&city.id=${selectedCity}`)
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
                        <AutoComplete
                            handleChange={handleInputChange}
                            textInput={textInput}
                            options={options}
                            open={open}
                            setTextInput={setTextInput}
                            handleCitySelect={handleCitySelect}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />
                        <Button type='submit' variant='contained' color="success" size="small"
                                className={classes.formButton}>Rechercher</Button>
                    </form>
                </Paper>
                {offers ? <HomeContent offers={offers} selected={selected} handleClick={handleClick}/> : <p>Aucune offre à pourvoir actuellement</p> }
            </div>
            } </ThemeProvider>
    );
}
export default HomeForm;