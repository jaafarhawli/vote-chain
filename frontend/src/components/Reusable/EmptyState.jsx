import React from 'react';
import Button from './Button';

const EmptyState = (props) => {
  return (
    <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
        <h1 className={props.light ? 'text-[24px] font-semibold text-purple-200' : 'text-[24px] font-semibold text-black-200'}>{props.title}</h1>
        <p className={props.light ? 'w-[220px] text-black-200' : 'w-[220px]'}>{props.children}</p>
        {props.button ? <Button className='mt-6' disabled={props.disabled} onClick={props.onClick} add={true} >{props.button}</Button> : null}       
    </div>
  );
}

export default EmptyState;
