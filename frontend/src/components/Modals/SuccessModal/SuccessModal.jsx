import React from 'react';
import {IoClose} from 'react-icons/io5';

const SuccessModal = ({open, closeSuccess, message, error}) => {

  return (
    <>
    {open ? 
    <div className='bg-black-100/50 fixed w-full h-full z-10 ' onClick={closeSuccess}>
     <div className={error? 'fixed top-[2%] left-1/2 -translate-x-1/2 w-2/3 max-w-[400px] flex bg-red/70 shadow-xl items-center gap-2 z-10 rounded-lg p-4' : 'fixed top-[2%] left-1/2 -translate-x-1/2 w-2/3 max-w-[400px] flex bg-green/70 shadow-xl items-center gap-2 z-10 rounded-lg p-4'} onClick={(e) => e.stopPropagation()}>
         <IoClose className='text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeSuccess} />
         <h1 className='font-semibold'>{message}</h1>
     </div>
    </div>
    : 
    null}
    </>
  );
}

export default SuccessModal;
