/* eslint-disable */ 
import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';
import Modal from './Modal';

const AddModerator = ({open, closeModal, refetch, socket}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [email, setEmail] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const addModerator = async () => {

        const form = {
            email: email,
            election_id: election.id,
            sender_email: localStorage.email,
            user_id: user.id
        }
        
        try {
             await axios.post('moderator', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              socket.emit('sendNotification', user.email, election.title, email);
              refetch();
              closeModal();
            } catch (error) {
                setError(error);
                setIsError(true);
                setErrorModal(true);
              console.log(error);
            }  
    }

    useEffect(() => {
      if(email==='')
      setDisabled(true)
      else
      setDisabled(false)
    }, [email]);

    if(!open)
    return null;

  return (
    <div>
        <Modal title={'Add Moderator'} closeModal={closeModal} content={
          <form className='w-4/5 flex flex-col gap-5 '>
            <FormLabelInput type="text" onChange={e => setEmail(e.target.value)}>Moderator Email</FormLabelInput>
            <Button className='bg-cyan' onClick={addModerator} disabled={disabled} >Add</Button>
          </form> 
        } />
        <SuccessModal open={errorModal} message={error} error={isError} closeSuccess={() => setErrorModal(false)} />
    </div> 
  );
}

export default AddModerator;
