import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';


const ErrorModal = ({open, closeError, error}) => {

    if(!open)
    return null;

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 ' onClick={closeError}>
     <div className=' fixed top-[2%] left-1/2 -translate-x-1/2 w-2/3 max-w-[400px] flex bg-red/70 shadow-xl items-center gap-2 z-10 rounded-lg p-4 ' onClick={(e) => e.stopPropagation()}>
         <HiOutlineXMark className='text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeError} />
         <h1 className='font-semibold'>{error}</h1>
     </div>
    </div>
  );
}

export default ErrorModal;
