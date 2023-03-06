import * as React from 'react';
import { useState , useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [ textInput, setTextInput ] = useState('')
    const loading = open && options.length === 0;

    const handleInputChange = () => {
        let active = true;

        if (!loading) {
            return undefined;
        }

            (async () => {
                await sleep(1e3); // For demo purposes.

                if (active && textInput.length > 3) {
                    axios.get(`/api/cities?name=${textInput}`)
                        .then(response => {
                            const cities = response.data['hydra:member'];
                            console.log(response.data['hydra:member'][0])
                            setOptions(cities);
                            setTextInput('1')
                        })
                        .catch(err => {
                            const errorMessage = "Error: " + err.message;
                            console.log(errorMessage);
                        })
                }
            })();

        return () => {
            active = false;
        };
    };

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            size='small'
            sx={{ width: '42%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    color='success'
                    size='small'
                    {...params}
                    label="Asynchronous"
                    value={textInput}
                    onChange={handleInputChange}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

