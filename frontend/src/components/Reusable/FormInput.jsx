import React from 'react';
import {TextField} from '@mui/material';

const FormInput = (props) => {

  return (
    <div className='w-full'>
        {/* <p className={`font-semibold mb-1 ${props.textStyle}`}>{props.children}</p> */}
        <TextField className={`w-full ${props.className}`} size='small' label={props.children} onChange={props.onChange} type={props.type} defaultValue={props.defaultValue} required={props.required} error={props.error} inputProps={{ style: { color: "white" } }} sx={{
        "& .MuiInputLabel-root": {color: 'white'},
        "& .MuiOutlinedInput-root": {
        "& > fieldset": { borderColor: "white" },
        '&:hover fieldset': {
          borderColor: 'grey',
        },
        }}} />
        {/* <input className={props.className} type={props.type} onChange={props.onChange} defaultValue={props.defaultValue} /> */}
    </div>
  );
}

export default FormInput;
