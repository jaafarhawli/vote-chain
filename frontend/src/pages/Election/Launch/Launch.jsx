import React, {useState} from 'react';
import Button from '../../../components/Reusable/Button';
import {ConfirmModal} from '../../../components/Modals';
import {useQuery} from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { viewVoters } from '../../../api/viewVoters';
import { viewCandidates } from '../../../api/viewCandidates';
import { launchElection } from './LaunchElection';
import { ElectionContainer } from '../../../components/Reusable';

// Launch election page
// Where the election admin can launch his election and no longer be able to alter it's data
// No voting can be done before the election gets launched 
const Launch = () => {

  const election = useSelector((state) => state.election.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [disabled, setDisabled] = useState(election.launched===true);
  
  const {data} = useQuery(["candidates"], () => viewCandidates(election.id));

  const {data: voters} = useQuery(["voters"], () => viewVoters(election.id));

  return (
    <>
    <ConfirmModal  open={confirmModal} closeModal={() => setConfirmModal(false)} click={() => launchElection(election.id, user.id, election.address, data, voters, dispatch, setDisabled, setConfirmModal)} launch={true} text={"Are you sure you want to launch this election?"} />
    <ElectionContainer title={'Launch Election'}>
        <div className='my-8 bg-yellow px-12 py-4 rounded-lg'>
          {election.launched ?
            <h1 className='text-center text-[24px] font-bold'>Your Election is launched</h1> 
            :
            <>
            <h1 className='text-center text-[28px] font-bold mb-2'>Attention!</h1>
            <p className='text-[22px]'>After you launch your election, you won't be able to:</p>
            <div className='flex flex-col items-start'>
                <ul className='list-disc text-[18px] mt-2'>
                    <li>Add or remove parties</li>
                    <li>Add or remove candidates</li>
                    <li>Add or remove voters</li>
                    <li>Edit election settings</li>
                    <li>Delete election</li>
                </ul>
            </div>
            </>}
        </div>
        <Button className='mt-4 mx-auto' disabled={disabled} onClick={() => setConfirmModal(true)}>Launch</Button>      
    </ElectionContainer>
    </>
  );
}

export default Launch;