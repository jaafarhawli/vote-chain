import React from 'react';
import {TbCopy} from 'react-icons/tb';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          toast("Copied to clipboard");
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }

      const {data} = useQuery(["parties"], async () => {
        return axios.get(`statistics/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
      })
      
      const {data: candidates} = useQuery(["candidates"], async () => {
        return axios.get(`statistics/candidates/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
      })

    const partyStats = {
      labels: data?.labels,
      datasets: [{
        data: data?.data,
        backgroundColor: ["#4ba0f7", "#00B8FF", "#7685e4", "#9568c7", "#a847a1", "#ae1f74"]
      }]
    }


    const candidatesNames = []
    const candidatesScores = []
    
    // Divide sorted candidates into two arrays
    if(candidates) 
    for(const [key, value] of Object.entries(candidates.sorted)) {
      candidatesNames.push(key);
      candidatesScores.push(value);
    }
    
    
    const candidateStats = {
      labels: candidatesNames.slice(0, 10),
      datasets: [{
        label: "Votes",
        data: candidatesScores.slice(0, 10),
        backgroundColor: ["#4ba0f7", "#00B8FF", "#7685e4", "#9568c7", "#a847a1", "#ae1f74"]
      }]
    }

    const date = new Date();
    const startDate = new Date(localStorage.election_start);
    const live = date > startDate;

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
    
      {!live ?
      <div className='flex w-full gap-6'>
        <div className='w-1/3 my-6 bg-white rounded-2xl shadow-xl p-6'>
          <Doughnut data={partyStats} />
        </div>
        <div className='w-2/3 my-6 bg-white rounded-2xl shadow-xl p-6 flex align-baseline'>
          <Bar data={candidateStats} />
        </div>
      </div>
      :
      null}
      <ToastContainer autoClose={1000} hideProgressBar={true} position="bottom-center" />
    </div>
  );
}

export default Dashboard;
