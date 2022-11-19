import React from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import CopyData from '../../components/Reusable/CopyData';
import { useSelector } from 'react-redux';
import BlockchainStatistics from '../../components/Reusable/BlockchainStatistics';

const Dashboard = () => {

    const election = useSelector((state) => state.election.value);

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          toast("Copied to clipboard");
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }  

      const {data} = useQuery([election], async () => {
         return axios.get(`statistics/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.numerics);     
      })

    return (
    <div className='pl-[330px] pt-[150px] bg-purple-400 pr-8'>
      <h1 className='text-[28px] font-bold'>Election Dashboard</h1>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election code</h2>
      <div className='flex w-full '>
        <div className='w-full'>
          <CopyData value={election?.code} onClick={(value) => copyTextToClipboard(value)} />
          <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election URL</h2>
          <CopyData value={'http://localhost:3000/vote'} onClick={(value) => copyTextToClipboard(value)} />
          <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election Appliance URL</h2>
          <CopyData value={`http://localhost:3000/survey/${election.code}`} onClick={(value) => copyTextToClipboard(value)} />
        </div>
        <ul className='bg-purple-300 w-[300px] rounded-2xl shadow-xl p-3 text-black-100 text-[24px] font-bold space-y-2 flex flex-col justify-center max-h-[170px]'>
            <li>Voters: <span className='text-purple-100'>{data?.voters}</span> </li>
            <li>Parties: <span className='text-purple-100'>{data?.parties}</span> </li>
            <li>Candidates: <span className='text-purple-100'>{data?.candidates}</span> </li>
        </ul>
      </div>
      <BlockchainStatistics electionAddress={data?.address} />
      <ToastContainer autoClose={1000} hideProgressBar={true} position="bottom-center" />
    </div>
  );
}

export default Dashboard;
