import React from 'react';

const Timer = (props) => {
  return (
    <div className='flex flex-col items-center'>
        <div className='w-[100px] h-[100px] bg-purple-100 shadow-2xl flex justify-center items-center text-white text-[40px] rounded-full font-bold'>{props.children}</div>
        <p className='text-[22px]'>{props.type}</p>
    </div>
  );
}

export default Timer;
