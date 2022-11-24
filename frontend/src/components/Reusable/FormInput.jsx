import React, {useState} from 'react';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FormInput = (props) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {  
      setShowPassword(!showPassword)
  };


  return (
    <div className='w-full'>
        <TextField className={`w-full ${props.className}`} size='small' label={props.children} onChange={props.onChange} type={props.type==='password' ? showPassword ? 'text' : 'password' : props.type} defaultValue={props.defaultValue} required={props.required} disabled={props.disabled} error={props.error} inputProps={{ style: { color: "white" } }} sx={{
        "& .MuiInputLabel-root": {color: 'white'},
        "& .MuiOutlinedInput-root": {
        "& > fieldset": { borderColor: "white" },
        '&:hover fieldset': {
          borderColor: 'grey',
        },
        }}}
        
        InputProps=
          {{endAdornment:(
            props.type === 'password' ? 
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
              {showPassword ? <VisibilityOff className='text-white' /> : <Visibility className='text-white' />}
              </IconButton>
            </InputAdornment>
            :
            null
          )}}  
        />
    </div>
  );
}

export default FormInput;



