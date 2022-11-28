import React, {useState, useEffect} from 'react';
import {Button, FormLabelInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal';
import { useSelector } from 'react-redux';
import { addVoter } from './AddVoterFunction';

const AddVoter = ({open, closeModal, refetch}) => {

    const election = useSelector((state) => state.election.value);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    const [success, setSuccess] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleClick = async () => {
        const res = await addVoter(name, email, address, election.id, refetch, closeModal);
        if(res) {
          setSuccess(res.success);
          setSuccessModal(res.successModal);
        }
    }

    useEffect(() => {
        if(name==='' || email==='' || address==='')
        setDisabled(true)
        else
        setDisabled(false)
      }, [name, email, address]);
  
  return (
    <>
    {open ?
    <div>
      <Modal title={'Add Voter'} closeModal={closeModal} content={
        <form className='w-4/5 flex flex-col gap-5 '>
          <FormLabelInput type="email" onChange={e => setEmail(e.target.value)} >Voter Email</FormLabelInput>
          <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Voter Name</FormLabelInput>
          <FormLabelInput type="text" onChange={e => setAddress(e.target.value)}>Voter Wallet Address</FormLabelInput>
          <Button className='bg-cyan' onClick={handleClick} disabled={disabled} >Add</Button>
        </form> 
      } />
    <SuccessModal open={successModal} message={success} error={true} closeSuccess={() => setSuccessModal(false)} />
    </div> 
    : 
    null}
    </>
    );
}

export default AddVoter;
