import React from 'react';
import {AiFillHome} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';

const ElectionTitle = () => {

    const navigate = useNavigate();
    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const local_start = new Date(election.startTime).toString();
    const local_end = new Date(election.endTime).toString();
  
    return (
    <div className='fixed pl-[250px] w-full z-[10] '>
      <div className='w-[98%] mt-2 mx-auto rounded-lg bg-bg/50 py-4 flex justify-between px-8 items-center max-h-[150px]'>
        <div className='text-white w-2/3 flex flex-col justify-center'>
        <h2 className='font-semibold text-[26px]'>{election.title}</h2>
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
            <Button className='bg-white/20 px-6 py-6' onClick={() => navigate('/main/settings')}>{user.firstName} {user.lastName}</Button>
        </div>
      </div>
    </div>
  );
}

export default ElectionTitle;
