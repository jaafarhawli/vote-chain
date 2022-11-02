import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png'

const AdminPanel = () => {
  return (
    <div className='fixed top-0 left-0 w-[300px] h-full bg-purple-500 flex flex-col'>
      <img src={logo} alt="" className='w-2/3 self-center pt-4' />
      <h1 className='self-center text-white bg-purple-300/20 w-2/3 text-center mt-6 py-1 font-semibold'>Admin</h1>
      <ul className='flex flex-col w-full mt-6'>
        <NavLink to='dashboard' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Dashboard
        </NavLink>
        <NavLink to='moderators' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Moderators
        </NavLink>
        <NavLink to='parties' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Parties
        </NavLink>
        <NavLink to='candidates' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Candidates
        </NavLink>
        <NavLink to='voters' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Voters
        </NavLink>
        <NavLink to='settings' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Settings
        </NavLink>
        <NavLink to='launch' className='text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            Launch
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminPanel;
