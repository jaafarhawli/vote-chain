import React from 'react';
import {IoClose} from 'react-icons/io5';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Whitelogo from '../../assets/VOTE CHAIN-logo-white.png';

const Modal = ({title, closeModal, content, dark}) => {
  return (
    <>
    {dark ?
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-bg neon shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <IoClose className='text-white fixed top-2 left-2 text-[30px] hover:bg-white/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={Whitelogo} alt="logo" className='w-[180px]' />
      <div className='bg-white h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>{title}</h1> 
      {content}
     </div>
    </div>
    :
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <IoClose className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>{title}</h1> 
      {content}
     </div>
    </div>}
    </>
  );
}

export default Modal;
