import React from 'react';
import {FaRegPlusSquare} from 'react-icons/fa';

const Button = (props) => {


    return (
        <button type={props.submit? 'submit' : 'button'} className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled} >
              <div className='flex items-center gap-1 justify-center'>
                  {props.children} 
                  {props.add ? <FaRegPlusSquare className='text-[18px]' /> : null}          
              </div>
          </button>
      );
}

export default Button;
