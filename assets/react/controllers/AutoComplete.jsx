import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

export default function AutoComplete(props) {
    const {textInput, options, open, handleChange, onOpen, onClose, handleCitySelect , setTextInput} = props;
    const loading = open && options.length === 0 ;
    const [value, setValue] = useState(null);

   // function handleOptionChange(event, newValue){
     //   setValue(newValue);
       // console.log(value)
    //}

    function handleClick(option){
        setValue(option)
        setTextInput(option.label)
        onClose()
        handleCitySelect(option.id)
        console.log(option.id)
    }

    return (
        <Autocomplete
            id="asynchronous-demo"
            size='small'
            color='success'
            sx={ open ? { width: '42%' } : { caretColor: 'transparent', width: '42%' }}
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={value}
            //onChange={() => handleOptionChange(event, value)}
            inputValue={textInput}
            options={options}
            autoHighlight
            //loading={loading}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ }} {...props} key={option.id} onClick={ () => handleClick(option)}>
                    {option.name} ({option.departmentNumber})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Ville"
                    color='success'
                    onChange={handleChange}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={10} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}

        />
    )
}

