import React from 'react';
import {TbCopy} from 'react-icons/tb';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Statistics from '../../components/Reusable/Statistics';

const Dashboard = () => {

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          toast("Copied to clipboard");
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }  

    return (
    <div className='pl-[330px] pt-[150px] bg-purple-400 pr-8'>
      <h1 className='text-[28px] font-bold'>Election Dashboard</h1>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election code</h2>
      <div className='flex gap-4 items-center mt-2'>
          <input type="text" value={localStorage.election_code} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
          <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => copyTextToClipboard(localStorage.election_code)}/>
      </div>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election URL</h2>
      <div className='flex gap-4 items-center mt-2'>
          <input type="text" value={'-'} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
          <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => copyTextToClipboard('-')}/>
      </div>
      <Statistics />
      <ToastContainer autoClose={1000} hideProgressBar={true} position="bottom-center" />
    </div>
  );
}

export default Dashboard;
