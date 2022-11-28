import React from 'react';
import Button from './Button';

const ElectionContainer = (props) => {
  return (
    <>
    {props.button ?
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '> 
            <div className='flex justify-between items-center w-full'>
              <h1 className='text-[28px] font-bold'>{props.title}</h1>
              <Button className={props.redButton ? 'bg-red' : null} onClick={props.onClick} add={true} disabled={props.disabled}>{props.buttonContent}</Button>
            </div>
            {props.children}
        </div>
    </div>
    :
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
          <h1 className='text-[28px] font-bold'>{props.title}</h1>
          {props.children}
        </div>
    </div>}
    </>
  );
}

export default ElectionContainer;
