import React, {useState} from 'react';
import {TbCopy} from 'react-icons/tb';


const AdminDashboard = () => {

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }
  
    return (
    <div className='pl-[330px] pt-[150px]'>
      <h1 className='text-[28px] font-bold'>Election Dashboard</h1>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election code</h2>
      <div className='flex gap-4 items-center mt-2'>
          <input type="text" value={localStorage.election_code} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
          <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => copyTextToClipboard(localStorage.election_code)}/>
      </div>
    </div>
  );
}

export default AdminDashboard;
