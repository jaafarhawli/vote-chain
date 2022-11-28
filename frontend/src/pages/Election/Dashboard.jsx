import React from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import CopyData from '../../components/Reusable/CopyData';
import { useSelector } from 'react-redux';
import BlockchainStatistics from '../../components/Complex/BlockchainStatistics/BlockchainStatistics';
import Loader from '../../components/Reusable/Loader';
import ElectionNumerics from '../../components/Reusable/ElectionNumerics';

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

      const {data, isFetching} = useQuery(["numerics"], async () => {
         return axios.get(`statistics/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.numerics);     
      })

    return (
    <>
    {isFetching ? 
    <Loader loading={isFetching} admin={true} />
    :
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
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
        <div className='bg-bg/50 border-2 rounded-lg shadow-xl p-3  text-[24px] font-bold  flex  max-h-[170px] gap-6 h-fit justify-between'>
            <ElectionNumerics label={'Voters'} value={data?.voters} />
            <ElectionNumerics label={'Parties'} value={data?.parties} />
            <ElectionNumerics label={'Candidates'} value={data?.candidates} />
        </div>
      </div>
      <BlockchainStatistics electionAddress={election.address} />
      <ToastContainer autoClose={1000} hideProgressBar={true} position="bottom-center" />
    </div>
    </div>}
    </>
  );
}

export default Dashboard;
