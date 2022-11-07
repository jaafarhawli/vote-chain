import React, {useState} from 'react';
import Button from '../../components/Reusable/Button';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import axios from '../../api/axios';

const Launch = () => {

    const [confirmModal, setConfirmModal] = useState(false);

    const closeConfirm = () => {
        setConfirmModal(false);
    }

    const launchElection = async () => {
        const form = {
            election_id: localStorage.election_id,
            user_id: localStorage.id 
        }     
        try {
            await axios.put('election/launch', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              localStorage.setItem("election_launched", true);
              closeConfirm()
            } catch (error) {
              console.log(error.response.data.message);
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
        <Button className='mt-4' onClick={() => setConfirmModal(true)}>Launch</Button>      
    </div>
    </>
  );
}

export default Launch;
