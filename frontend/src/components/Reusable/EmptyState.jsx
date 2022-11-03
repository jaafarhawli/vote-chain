import React from 'react';
import AddButton from './AddButton';

const EmptyState = (props) => {
  return (
    <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
        <h1 className='text-[24px] font-semibold text-black-200'>{props.title}</h1>
        <p className='w-[220px]'>{props.children}</p>
        {props.button && <AddButton className='mt-6' onClick={props.onClick}>{props.button}</AddButton>}       
    </div>
  );
}

export default EmptyState;
