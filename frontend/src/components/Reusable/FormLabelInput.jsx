import React from 'react';

const FormLabelInput = (props) => {

  return (
    <div className='w-full'>
        <p className={`font-semibold mb-1 ${props.textStyle}`}>{props.children}</p>
        <input className={props.className} type={props.type} onChange={props.onChange} defaultValue={props.defaultValue} />
    </div>
  );
}

export default FormLabelInput;