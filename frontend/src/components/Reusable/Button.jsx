import React from 'react';
import {FaRegPlusSquare} from 'react-icons/fa';

const Button = (props) => {

    if(props.add)
    return (
          <button className={`button ${props.className}`} onClick={props.onClick}>
              <div className='flex items-center gap-1 justify-center'>
                  {props.children} <FaRegPlusSquare className='text-[18px]' />          
              </div>
          </button>
      );

  return (
    <button type={props.submit? 'submit' : 'button'} className={`button ${props.className}`} onClick={props.onClick} >{props.children}</button>
  );
}

export default Button;
