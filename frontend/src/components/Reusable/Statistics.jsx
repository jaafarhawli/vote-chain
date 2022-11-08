import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

const Statistics = () => {
    
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
      
      const {data: parties} = useQuery(["partyCandidates"], async () => {
        return axios.get(`statistics/party/candidates/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.result);
      })
      
      const {data: votes} = useQuery(["votes"], async () => {
        return axios.get(`statistics/vote/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
      })
      
    
    const partyStats = {
      labels: data?.labels,
      datasets: [{
        data: data?.data,
        backgroundColor: ["#9568c7", "#00B8FF", "#7685e4", "#4ba0f7", "#a847a1", "#ae1f74"]
      }]
    }
    
    const voteStats = {
      labels: ["Voted", "Did'nt Vote"],
      datasets: [{
        data: [votes?.voted, votes?.notVoted],
        backgroundColor: ["#4ba0f7", "#9568c7"]
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
    <div>
      {!live ?
      <>
        <div className='flex w-full gap-6 my-6'>
        <div className='w-1/3 bg-white rounded-2xl shadow-xl p-6'>
          <Pie data={voteStats} />
        </div>
        <div className='w-2/3 bg-white rounded-2xl shadow-xl p-6 flex align-baseline'>
          <Bar data={candidateStats}
                options={{
                  scales: {
                    y: {
                      grid: {
                        display: false
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  },       
                  elements: {
                    bar: {
                      borderWidth: 2,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Top Candidates',
                    },
                  },
                }} />
        </div>
      </div>
      <div className='flex flex-wrap gap-6 mb-6 w-full'>
        <div className='w-1/3 bg-white rounded-2xl shadow-xl p-6'>
          <Doughnut data={partyStats} />
        </div>
      {parties?.map((party) => (
          <div className='w-1/2 min-w-[50%] max-w-[66%] bg-white rounded-2xl h-fit shadow-xl p-6 flex align-baseline flex-1'>
            <Bar data={{
              labels: party.labels,
              datasets: [{
                label: party.party,
                data: party.data,
                backgroundColor: ["#4ba0f7", "#00B8FF", "#7685e4", "#9568c7", "#a847a1", "#ae1f74"]
              }]}}
              options={{
                indexAxis: 'y',
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                scales: {
                  y: {
                    grid: {
                      display: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
             />
          </div>
      ))}
      </div>
      </>
      :
      null}
    </div>
  );
}

export default Statistics;
