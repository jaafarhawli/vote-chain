import React from 'react';

const FormInput = (props) => {
  return (
    <label>
        <p className={`font-semibold mb-1 ${props.textStyle}`}>{props.children}</p>
        <input className={props.className} type={props.type} onChange={props.onChange} defaultValue={props.defaultValue} />
    </label>
  );
}

export default FormInput;
