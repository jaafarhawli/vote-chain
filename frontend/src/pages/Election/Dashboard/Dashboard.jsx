import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import BlockchainStatistics from '../../../components/Complex/BlockchainStatistics/BlockchainStatistics';
import {Loader, ElectionNumerics, CopyData, ElectionContainer} from '../../../components/Reusable';
import { ToastContainer, toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import { viewElectionNumerics } from '../../../api/viewElectionNumerics';

// Election dashboard page
// Contains the election numerics and statistical charts when election is live
// Contains election code, voting link that can be sent to voters, and survey link
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

      const {data, isFetching} = useQuery(["numerics"], () => viewElectionNumerics(election.id));

    return (
    <>
    {isFetching ? 
    <Loader loading={isFetching} admin={true} />
    :
    <ElectionContainer title={'Dashboard'}>
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
    </ElectionContainer>}
    </>
  );
}

export default Dashboard;
