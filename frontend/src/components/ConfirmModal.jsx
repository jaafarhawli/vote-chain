import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';

const ConfirmModal = ({open, closeModal}) => {      

    if(!open)
    return null;

return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-[400px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' />
         <h1 className='font-semibold text-[22px] text-center'>Are you sure you want to delete your account?</h1>
         <div className='flex justify-evenly w-full mt-8'>
             <button type='button' onClick={closeModal} >Cancel</button>
             <button className='bg-red'>Delete</button>
         </div>
     </div>
    </div>
  );
}

export default ConfirmModal;
