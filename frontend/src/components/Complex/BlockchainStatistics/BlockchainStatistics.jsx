/* eslint-disable */ 
import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { viewCandidates, viewTimeInterval, viewVoters } from '../../../Web3';
import { candidateStatsOptions, partyCandidateStatsOptions } from '../../../JSON';
import { compareTime } from './CompareTime';
import {getStats} from './GetStats';
import { sortCandidates } from './SortCandidates';

const BlockchainStatistics = ({electionAddress}) => {

  const [parties, setParties] = useState();
  const [partiesScores, setPartiesScores] = useState();
  const [candidatesNames, setCandidatesNames] = useState();
  const [candidatesScores, setCandidatesScores] = useState();
  const [allCandidates, setAllCandidates] = useState();
  const [allCandidatesScores, setAllCandidatesScores] = useState();
  const [votedVoters, setVotedVoters] = useState();
  const [sorted, setSorted] = useState(false);
  const [isLive, setIsLive] = useState(false);

    const viewStats = (data) => {
      getStats(data, setParties, setPartiesScores, setAllCandidates, setAllCandidatesScores, setCandidatesNames, setCandidatesScores);
      sortCandidates(allCandidates, allCandidatesScores, setAllCandidates, setAllCandidatesScores);
      if(!sorted)
      setSorted(true);
    }

    const partyStats = {
      labels: parties,
      datasets: [{
        data: partiesScores,
        backgroundColor: ["#9568c7", "#00B8FF", "#7685e4", "#4ba0f7", "#a847a1", "#ae1f74"]
      }]
    }
    
    const candidateStats = {
      labels: allCandidates?.slice(0, 10),
      datasets: [{
        label: "Votes",
        data: allCandidatesScores?.slice(0, 10),
        backgroundColor: ["#4ba0f7", "#00B8FF", "#7685e4", "#9568c7", "#a847a1", "#ae1f74"],
        barThickness: 55,
      }]
    }

    useEffect(() => {
      if(electionAddress){
        viewCandidates(electionAddress).then((data) => {
            viewStats(data);
        });
        viewVoters(electionAddress).then((data) => {
            setVotedVoters([data]);
        })
        viewTimeInterval(electionAddress).then((data) => {
        compareTime(parseInt(data[0])).then((live) => {
          setIsLive(live);
        })
      });
      }
    }, [sorted, electionAddress]);

  return (
    <div>
      {isLive ?
      <>
        <div className='flex w-full gap-6 my-6'>
        <div className='w-1/3 bg-white rounded-2xl shadow-xl p-6'>
          {votedVoters ? <Pie data={{
              labels: ["Voted", "Did'nt Vote"],
              datasets: [{
                data: [parseInt(votedVoters[0][0]), parseInt(votedVoters[0][1])],
                backgroundColor: ["#4ba0f7", "#9568c7"]
              }]
            }} /> : null}
        </div>
        <div className='w-2/3 bg-white rounded-2xl shadow-xl p-6 flex align-baseline'>
          <Bar data={candidateStats} options={candidateStatsOptions} />
        </div>
      </div>
      <div className='flex flex-wrap gap-6 mb-6 w-full'>
        <div className='w-1/3 bg-white rounded-2xl shadow-xl p-6'>
          <Doughnut data={partyStats} />
        </div>
      {parties?.map((party, index) => (
          <div className='min-w-[40%] max-w-[66%] bg-white rounded-2xl h-fit shadow-xl p-6 flex align-baseline flex-1' key={index}>
            <Bar data={{
              labels: candidatesNames[index],
              datasets: [{
                label: party,
                data: candidatesScores[index],
                backgroundColor: ["#4ba0f7", "#00B8FF", "#7685e4", "#9568c7", "#a847a1", "#ae1f74"],
                barThickness: 55,
              }]}}
              options={partyCandidateStatsOptions}
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

export default BlockchainStatistics;