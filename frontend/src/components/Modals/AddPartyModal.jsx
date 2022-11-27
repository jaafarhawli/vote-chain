import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';
import Modal from './Modal';

const AddPartyModal = ({open, closeModal, refetch}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);

    const addParty = async () => {

        const form = {
            name: name,
            election_id: election.id,
            user_id: user.id
        }
        
        try {
             await axios.post('party', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeModal();
            } catch (error) {
                setError(error.response.data.message);
                setErrorModal(true);
              console.log(error.response.data.message);
            }
        
    }

    useEffect(() => {
      if(name==='')
      setDisabled(true)
      else
      setDisabled(false)
    }, [name]);

    if(!open)
    return null;

  return (
    <div>
      <Modal title={'Add Party'} closeModal={closeModal} content={
        <form className='w-4/5 flex flex-col gap-5 '>
        <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Party Name</FormLabelInput>
        <Button className='bg-cyan' onClick={addParty} disabled={disabled} >Add</Button>
        </form> 
      } />
      <SuccessModal open={errorModal} message={error} error={true} closeSuccess={() => setErrorModal(false)} />
    </div> 
  );
}

export default AddPartyModal;
