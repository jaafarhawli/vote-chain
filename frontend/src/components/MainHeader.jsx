import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';
import curve from '../assets/main-curve.svg';
import { useNavigate } from 'react-router-dom';
import AddButton from './AddButton';

const MainHeader = (props) => {

    const navigate = useNavigate();

  if(props.empty)
  return (
    <div>
      <div className='flex flex-col lg:px-28 md:px-10 px-4 bg-gradient-to-b from-black-100 to-black-200 w-full pt-6'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-36' />
            <div className='flex gap-3 text-white font-semibold items-center'>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main')}>Admin</h2>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main/moderator')}>Moderator</h2>
                <button onClick={() => navigate('/main/settings')}>{localStorage.firstname} {localStorage.lastname}</button>
            </div>
        </div>
        <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold mt-8'>{props.title}</h1>
            
      </div>
      <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center md:[100px] h-[60px]' style={{backgroundImage: `url("${curve}")`}}></div>
    </div>
  );

  else return (
    <div>
      <div className='flex flex-col lg:px-28 md:px-10 px-4 bg-gradient-to-b from-black-100 to-black-200 w-full pt-6'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-36' />
            <div className='flex gap-3 text-white font-semibold items-center'>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main')}>Admin</h2>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main/moderator')}>Moderator</h2>
                <button onClick={() => navigate('/main/settings')}>{localStorage.firstname} {localStorage.lastname}</button>
            </div>
        </div>
        <div className='flex justify-between w-full items-center mt-8'>
            <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold '>{props.title}</h1>
            <AddButton text={"Create a new election"} />
        </div>
      </div>
      <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center md:[100px] h-[60px]' style={{backgroundImage: `url("${curve}")`}}></div>
    </div>
  );
}

export default MainHeader;
