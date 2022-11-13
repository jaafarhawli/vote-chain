import React from 'react';
import {TbCopy} from 'react-icons/tb';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Statistics from '../../components/Reusable/Statistics';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import BlockchainStatistics from '../../components/Reusable/BlockchainStatistics';

const Dashboard = () => {

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          toast("Copied to clipboard");
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }  

      const {data} = useQuery(["numerics"], async () => {
        return axios.get(`statistics/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.numerics);
      })

    return (
    <div className='pl-[330px] pt-[150px] bg-purple-400 pr-8'>
      <h1 className='text-[28px] font-bold'>Election Dashboard</h1>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election code</h2>
      <div className='flex w-full items-stretch'>
        <div className='w-full'>
          <div className='flex gap-4 items-center mt-2'>
              <input type="text" value={localStorage.election_code} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
              <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => copyTextToClipboard(localStorage.election_code)}/>
          </div>
          <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election URL</h2>
          <div className='flex gap-4 items-center mt-2'>
              <input type="text" value={'-'} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
              <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => copyTextToClipboard('-')}/>
          </div>
        </div>
        <ul className='bg-purple-300 w-[300px] rounded-2xl shadow-xl p-3 text-black-100 text-[24px] font-bold space-y-2 flex flex-col justify-center'>
            <li>Voters: <span className='text-purple-100'>{data?.voters}</span> </li>
            <li>Parties: <span className='text-purple-100'>{data?.parties}</span> </li>
            <li>Candidates: <span className='text-purple-100'>{data?.candidates}</span> </li>
        </ul>
      </div>
      <Statistics />
      <BlockchainStatistics />
      <ToastContainer autoClose={1000} hideProgressBar={true} position="bottom-center" />
    </div>
  );
}

export default Dashboard;
