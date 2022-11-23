import React from 'react';
import {TextField} from '@mui/material';

const FormInput = (props) => {

  return (
    <div className='w-full'>
        <TextField className={`w-full ${props.className}`} size='small' label={props.children} onChange={props.onChange} type={props.type} defaultValue={props.defaultValue} required={props.required} disabled={props.disabled} error={props.error} inputProps={{ style: { color: "white" } }} sx={{
        "& .MuiInputLabel-root": {color: 'white'},
        "& .MuiOutlinedInput-root": {
        "& > fieldset": { borderColor: "white" },
        '&:hover fieldset': {
          borderColor: 'grey',
        },
        }}} />
    </div>
  );
}

export default FormInput;
