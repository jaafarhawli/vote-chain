import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../api/axios';
import logo from '../assets/VOTE CHAIN-logo-black.png';

const CreateElection = ({open, closeModal}) => {

 
    

    if(!open)
    return null;

return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>New Election</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <label>
              <p className='font-medium'>Election title</p>
              <input className=' border-[1px] border-black-200' type="text" />
          </label>
          <div className='flex gap-2'>
            <label>
                <p className='font-medium'>Start date</p>
                <input type="text"  className=' border-[1px] border-black-200' />
            </label>
            <label>
                <p className='font-medium'>End date</p>
                <input className=' border-[1px] border-black-200' type="text"/>
            </label>
          </div>
          <label>
              <p className='font-medium'>Timezone</p>
              <input className=' border-[1px] border-black-200' type="text"/>
          </label>
          <button className='bg-cyan' type="button">Create election</button>
      </form> 
     </div>
    </div>
  );
}

export default CreateElection;
