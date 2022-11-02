import React, {useState} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../api/axios';
import logo from '../assets/VOTE CHAIN-logo-black.png';

const AddModerator = ({open, closeModal}) => {

    const [email, setEmail] = useState();

    

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <ErrorModal open={errorModal} error={error} closeError={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Moderator</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <label>
              <p className='font-medium'>Moderator Email</p>
              <input className=' border-[1px] border-black-200' type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <button className='bg-cyan' type="button" onClick={createElection}>Add</button>
      </form> 
     </div>
    </div>
  );
}

export default AddModerator;
