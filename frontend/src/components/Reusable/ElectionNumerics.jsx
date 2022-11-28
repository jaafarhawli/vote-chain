import React from 'react';

const ElectionNumerics = (props) => {
  return (
    <div className='text-center flex flex-col gap-2 items-center'>
      <h1>{props.label}</h1>
      <div className='rounded-lg w-full py-1  flex items-center justify-center min-w-[130px]'>
        {props.value}
      </div>
    </div>
  );
}

export default ElectionNumerics;
