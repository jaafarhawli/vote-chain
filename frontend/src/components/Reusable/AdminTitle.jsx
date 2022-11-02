import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const AdminTitle = () => {

    const navigate = useNavigate();
  
    return (
    <div className='fixed pl-[300px] w-full'>
      <div className='w-full bg-purple-100 py-6 flex justify-between px-8 items-center'>
        <div className='text-white w-3/5 flex flex-col justify-center'>
        <h2 className='font-semibold text-[26px]'>{localStorage.election_title}</h2>
              <div className='flex w-full flex-row mt-2 gap-2'>
                <div className='flex-1'>
                    <p className='text-[18px]'><span className=' font-semibold'>Starts on</span> {localStorage.start_time}</p>
                </div>
                <div className='flex-1'>
                    <p className='text-[18px]'><span className=' font-semibold '>Ends on</span> {localStorage.end_time}</p>
                </div>
              </div>
        </div>
        <div className='flex gap-8 items-center'>
            <AiFillHome className='text-white text-[30px] hover:text-white/80 duration-150' onClick={() => navigate('/main')} />
            <button className='bg-white/20 px-6 py-6' onClick={() => navigate('/main/settings')}>{localStorage.firstname} {localStorage.lastname}</button>
        </div>
      </div>
    </div>
  );
}

export default AdminTitle;
