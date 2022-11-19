import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { viewCandidates, viewVoters } from '../../Web3Client';


const BlockchainStatistics = () => {

    const [parties, setParties] = useState();
    const [partiesScores, setPartiesScores] = useState();
    const [candidatesNames, setCandidatesNames] = useState();
    const [candidatesScores, setCandidatesScores] = useState();
    const [allCandidates, setAllCandidates] = useState();
    const [allCandidatesScores, setAllCandidatesScores] = useState();
    const [votedVoters, setVotedVoters] = useState();

    const getPartyNames = (data) => {
        const names = [];
        const scores = [];
        const candidates = [];
        const candidatesScores = [];
        const allCandidates = [];
        const allCandidatesScores = [];
        for(let candidate of data) {
            allCandidates.push(candidate.name);
            allCandidatesScores.push(parseInt(candidate.voteCount));
            if(!names.includes(candidate.partyName)) {
                names.push(candidate.partyName);
                scores.push(parseInt(candidate.voteCount));
                candidates.push([candidate.name]);
                candidatesScores.push([parseInt(candidate.voteCount)]);
            }
            else {
                for(let i=0; i<names.length; i++) {
                    if(names[i]===candidate.partyName) {
                        scores[i]+=parseInt(candidate.voteCount);
                        candidates[i].push(candidate.name);
                        candidatesScores[i].push(parseInt(candidate.voteCount));
                    }
                }
            }
        setParties(names);
        setPartiesScores(scores);
        setCandidatesNames(candidates);
        setCandidatesScores(candidatesScores);
        setAllCandidates(allCandidates);
        setAllCandidatesScores(allCandidatesScores);
        }
    }

    const sortCandidates = () => {
        const indices = [...allCandidatesScores.keys()]
        indices.sort( (a,b) => allCandidatesScores[a] - allCandidatesScores[b] )

        const sortedNames = indices.map(i => allCandidates[i]);
        const sortedScores = indices.map(i => allCandidatesScores[i]);
        setAllCandidates(sortedNames);
        setAllCandidatesScores(sortedScores);
    }
    
    useEffect(() => {
        viewCandidates(localStorage.election_address).then((data) => {
            getPartyNames(data);
            sortCandidates();
        });
        viewVoters(localStorage.election_address).then((data) => {
            setVotedVoters([data]);
        });
    }, []);

    console.log(allCandidates, allCandidatesScores);
    


    const partyStats = {
      labels: parties,
      datasets: [{
        data: partiesScores,
        backgroundColor: ["#9568c7", "#00B8FF", "#7685e4", "#4ba0f7", "#a847a1", "#ae1f74"]
      }]
    }
    
    const voteStats = {
      labels: ["Voted", "Did'nt Vote"],
      datasets: [{
        data: [parseInt(votedVoters[0]), parseInt(votedVoters[1])],
        backgroundColor: ["#4ba0f7", "#9568c7"]
      }]
    }
    
    
    const candidateStats = {
      labels: allCandidates?.slice(0, 10),
      datasets: [{
        label: "Votes",
        data: allCandidatesScores?.slice(0, 10),
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
      {parties?.map((party, index) => (
          <div className='min-w-[40%] max-w-[66%] bg-white rounded-2xl h-fit shadow-xl p-6 flex align-baseline flex-1'>
            <Bar data={{
              labels: candidatesNames[index],
              datasets: [{
                label: party,
                data: candidatesScores,
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

export default BlockchainStatistics;