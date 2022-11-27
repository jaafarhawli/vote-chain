import React, {useState, useEffect} from 'react';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';
import Modal from './Modal';

const AddVoter = ({open, closeModal, refetch}) => {

    const election = useSelector((state) => state.election.value);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    const [success, setSuccess] = useState('');
    const [disabled, setDisabled] = useState(true);

    const addVoter = async () => {

        const form = {
            name: name,
            email: email,
            wallet_address: address,
            election_id: election.id,
        }     
        try {
             await axios.post('voter', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeModal();
            } catch (error) {
                setSuccess(error.response.data.message);
                setSuccessModal(true);
                console.log(error.response.data.message);
            }   
    }

    useEffect(() => {
        if(name==='' || email==='' || address==='')
        setDisabled(true)
        else
        setDisabled(false)
      }, [name, email, address]);
  
      if(!open)
      return null;

  return (
    <div>
    <Modal title={'Add Voter'} closeModal={closeModal} content={
      <form className='w-4/5 flex flex-col gap-5 '>
        <FormLabelInput type="email" onChange={e => setEmail(e.target.value)} >Voter Email</FormLabelInput>
        <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Voter Name</FormLabelInput>
        <FormLabelInput type="text" onChange={e => setAddress(e.target.value)}>Voter Wallet Address</FormLabelInput>
        <Button className='bg-cyan' onClick={addVoter} disabled={disabled} >Add</Button>
      </form> 
    } />
    <SuccessModal open={successModal} message={success} error={true} closeSuccess={() => setSuccessModal(false)} />
  </div> 
  );
}

export default AddVoter;
