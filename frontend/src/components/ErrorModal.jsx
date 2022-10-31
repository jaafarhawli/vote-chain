import React from 'react';

const ErrorModal = ({errorModal, closeError, error}) => {

    if(!errorModal)
    return null;

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
     <div className=' fixed top-[10%] left-1/2 -translate-x-1/2 w-2/3 max-w-[400px] flex bg-white shadow-xl items-center z-10 rounded-lg p-4 '>
         <HiOutlineXMark className='text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeError} />
         <h1>{error}</h1>
     </div>
    </div>
  );
}

export default ErrorModal;
