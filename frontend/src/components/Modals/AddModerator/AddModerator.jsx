/* eslint-disable */ 
import React, {useState, useEffect} from 'react';
import {Button, FormLabelInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal/SuccessModal';
import { useSelector } from 'react-redux';
import { addModerator } from './AddModeratorFunction';

const AddModerator = ({open, closeModal, refetch, socket}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [email, setEmail] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const handleClick = async () => {
        const res = await addModerator(email, election.id, user.id, user.email, election.title, socket, refetch, closeModal);
        if(res) {
          setError(res.error);
          setIsError(res.isError);
          setErrorModal(res.errorModal);
        }
    }

    useEffect(() => {
      if(email==='')
      setDisabled(true)
      else
      setDisabled(false)
    }, [email]);

  return (
    <>
    {open ?
    <div>
        <Modal title={'Add Moderator'} closeModal={closeModal} content={
          <form className='w-4/5 flex flex-col gap-5 '>
            <FormLabelInput type="text" onChange={e => setEmail(e.target.value)}>Moderator Email</FormLabelInput>
            <Button className='bg-cyan' onClick={handleClick} disabled={disabled} >Add</Button>
          </form> 
        } />
        <SuccessModal open={errorModal} message={error} error={isError} closeSuccess={() => setErrorModal(false)} />
    </div>
    : 
    null} 
    </>
  );
}

export default AddModerator;
