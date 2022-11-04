import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ElectionTitle = () => {

    const navigate = useNavigate();

    const local_start = new Date(localStorage.election_start).toString();
    const local_end = new Date(localStorage.election_end).toString();
  
    return (
    <div className='fixed pl-[300px] w-full z-[10] '>
      <div className='w-full bg-purple-100 py-4 flex justify-between px-8 items-center max-h-[150px]'>
        <div className='text-white w-2/3 flex flex-col justify-center'>
        <h2 className='font-semibold text-[26px]'>{localStorage.election_title}</h2>
              <div className='flex w-full flex-row mt-2 gap-2'>
                <div className='flex-1'>
                    <p className='text-[16px]'><span className=' font-semibold'>Starts on</span> {local_start}</p>
                </div>
                <div className='flex-1'>
                    <p className='text-[16px]'><span className=' font-semibold '>Ends on</span> {local_end}</p>
                </div>
              </div>
        </div>
        <div className='flex gap-8 items-center'>
            <AiFillHome className='text-white text-[30px] hover:text-white/80 duration-150' onClick={() => navigate('/main')} />
            <Button className='bg-white/20 px-6 py-6' onClick={() => navigate('/main/settings')}>{localStorage.firstname} {localStorage.lastname}</Button>
        </div>
      </div>
    </div>
  );
}

export default ElectionTitle;
