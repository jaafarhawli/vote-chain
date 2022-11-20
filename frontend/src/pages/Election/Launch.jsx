import React, {useState} from 'react';
import Button from '../../components/Reusable/Button';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';
import { addCandidates, addVoterToBlockchain, launchElection as launchToBlockchain } from '../../Web3Client';
import { useSelector, useDispatch } from 'react-redux';
import { viewElection } from '../../redux/election';

const Launch = () => {

    const election = useSelector((state) => state.election.value);
    const dispatch = useDispatch();

    const [confirmModal, setConfirmModal] = useState(false);
    const [disabled, setDisabled] = useState(election.launched===true);

    const {data} = useQuery([""], async () => {
      return axios.get(`candidate/${election.id}`, {
                  headers: {
                    Authorization: `bearer ${localStorage.token}`
                  }
                }).then((res) => res.data.data);
  })

  const {data: voters} = useQuery(["voters"], async () => {
    return axios.get(`voter/voters/${election.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
})

  const addCandidatesToBlockchain = async () => {
    let candidates = [];
    let parties = [];
    for(let candidate of data) {
      candidates.push(candidate.name);
      parties.push(candidate.party);
    }
    await addCandidates(candidates, parties, election.address);
  }
  
  const addVotersToBlockChain = async () => {
    let voters_addresses = [];
    for(let voter of voters) {
      voters_addresses.push(voter.voter_wallet_address);
    }
    await addVoterToBlockchain(voters_addresses, election.address);
  }

    
    const closeConfirm = () => {
        setConfirmModal(false);
    }

    const launchElection = async () => {
        const form = {
            election_id: election.id,
            user_id: localStorage.id 
        }
        await addCandidatesToBlockchain();
        await addVotersToBlockChain();
        await launchToBlockchain(election.address);     
        try {
            await axios.put('election/launch', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              dispatch(viewElection({
                launched: true,
                id: election.id,
                title: election.title,
                startTime: election.startTime,
                endTime: election.endTime,
                description: election.description,
                code: election.code,
                address: election.address
              }));
              setDisabled(true);
              closeConfirm();
            } catch (error) {
              console.log(error);
            }
        }

  return (
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={launchElection} launch={true} text={"Are you sure you want to launch this election?"} />
    <div className='items-center pl-[330px] pt-[150px] pr-6 flex flex-col'>
        <h1 className='text-[28px] font-bold'>Launch Election</h1>
        <div className='my-8'>
            <p className='text-[22px] font-semibold'>After you launch your election, you won't be able to:</p>
            <div className='flex flex-col items-start'>
                <ul className='list-disc text-[18px] ml-12 mt-2'>
                    <li>Add or remove parties</li>
                    <li>Add or remove candidates</li>
                    <li>Add or remove voters</li>
                    <li>Edit election settings</li>
                    <li>Delete election</li>
                </ul>
            </div>
        </div>
        <Button className='mt-4' disabled={disabled} onClick={() => setConfirmModal(true)}>Launch</Button>      
    </div>
    </>
  );
}

export default Launch;
