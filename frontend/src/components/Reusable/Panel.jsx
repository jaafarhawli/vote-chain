import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import {RiDashboardFill} from 'react-icons/ri';
import {HiUserGroup} from 'react-icons/hi';
import {FaUserTie, FaUserCog, FaUser} from 'react-icons/fa';
import {MdSettings} from 'react-icons/md';
import {TbCloudUpload} from 'react-icons/tb';

const Panel = (props) => {
  return (
    <div className='fixed top-0 left-0 w-[300px] h-full bg-purple-500 flex flex-col'>
      <img src={logo} alt="" className='w-3/5 self-center pt-8' />
      <h1 className='self-center text-white bg-purple-300/20 w-3/5 text-center mt-6 py-1 font-semibold select-none'>Admin</h1>
      <ul className='flex flex-col w-full mt-6'>
        <NavLink to='dashboard' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <RiDashboardFill />
            Dashboard
        </NavLink>
        
        {props.admin ?
        <>
        <NavLink to='moderators' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <FaUserCog />
            Moderators
        </NavLink>
        <NavLink to='parties' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <HiUserGroup />
            Parties
        </NavLink>
        <NavLink to='candidates' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <FaUserTie />
            Candidates
        </NavLink>
        </> : null }    
        <NavLink to='voters' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <FaUser />
            Voters
        </NavLink>
        {props.admin ? 
        <>
        <NavLink to='settings' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <MdSettings />
            Settings
        </NavLink>
        <NavLink to='launch' className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' activeclassname='active'>
            <TbCloudUpload />
            Launch
        </NavLink>
        </> : null}
      </ul>
    </div>
  );
}

export default Panel;
