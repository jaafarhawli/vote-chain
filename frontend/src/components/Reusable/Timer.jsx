import React from 'react';

const Timer = (props) => {
  return (
    <div className='w-[100px] h-[100px] bg-purple-100 shadow-2xl flex justify-center items-center text-white text-[40px] rounded-full'>{props.children}</div>
  );
}

export default Timer;
