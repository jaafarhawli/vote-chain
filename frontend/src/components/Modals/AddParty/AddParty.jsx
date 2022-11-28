import React, {useState, useEffect} from 'react';
import {Button, FormLabelInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal/SuccessModal';
import { useSelector } from 'react-redux';
import { addParty } from './AddPartyFunction';

const AddParty = ({open, closeModal, refetch}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleClick = async () => {
        const res = await addParty(name, election.id, user.id, refetch, closeModal);
        if(res) {
          setError(res.error);
          setErrorModal(res.errorModal);
        }
    }

    useEffect(() => {
      if(name==='')
      setDisabled(true)
      else
      setDisabled(false)
    }, [name]);

  return (
    <>
    {open ?
    <div>
      <Modal title={'Add Party'} closeModal={closeModal} content={
        <form className='w-4/5 flex flex-col gap-5 '>
        <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Party Name</FormLabelInput>
        <Button className='bg-cyan' onClick={handleClick} disabled={disabled} >Add</Button>
        </form> 
      } />
      <SuccessModal open={errorModal} message={error} error={true} closeSuccess={() => setErrorModal(false)} />
    </div>
    : 
    null}
    </>
  );
}

export default AddParty;
