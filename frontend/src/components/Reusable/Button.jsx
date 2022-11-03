import React from 'react';

const Button = (props) => {
  return (
    <button type={props.submit? 'submit' : 'button'} className={`button ${props.className}`} onClick={props.onClick} >{props.children}</button>
  );
}

export default Button;
