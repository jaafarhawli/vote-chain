import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';
import {AiFillHome} from 'react-icons/ai';
import {HiUserGroup} from 'react-icons/hi';
import {FaUserTie, FaUserCog, FaUser} from 'react-icons/fa';
import {MdSettings} from 'react-icons/md';
import {TbCloudUpload} from 'react-icons/tb';

const AdminPanel = () => {
  return (
    <div className='fixed top-0 left-0 w-[300px] h-full bg-purple-500 flex flex-col'>
      <img src={logo} alt="" className='w-2/3 self-center pt-4' />
      <h1 className='self-center text-white bg-purple-300/20 w-2/3 text-center mt-6 py-1 font-semibold select-none'>Admin</h1>
      <ul className='flex flex-col w-full mt-6'>
        <NavLink to='dashboard' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <AiFillHome />
            Dashboard
        </NavLink>
        <NavLink to='moderators' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <FaUserCog />
            Moderators
        </NavLink>
        <NavLink to='parties' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <HiUserGroup />
            Parties
        </NavLink>
        <NavLink to='candidates' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <FaUserTie />
            Candidates
        </NavLink>
        <NavLink to='voters' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <FaUser />
            Voters
        </NavLink>
        <NavLink to='settings' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <MdSettings />
            Settings
        </NavLink>
        <NavLink to='launch' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4' activeclassname='active'>
            <TbCloudUpload />
            Launch
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminPanel;
