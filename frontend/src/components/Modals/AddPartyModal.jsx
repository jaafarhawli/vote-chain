import React, {useState, useEffect} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import FormInput from '../Reusable/FormInput';
import SuccessModal from './SuccessModal';

const AddPartyModal = ({open, closeModal, refetch}) => {

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);

    const addParty = async () => {

        const form = {
            name: name,
            election_id: localStorage.election_id,
            user_id: localStorage.id
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
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <SuccessModal open={errorModal} message={error} error={true} closeSuccess={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Party</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" onChange={e => setName(e.target.value)}>Party Name</FormInput>
          <Button className='bg-cyan' onClick={addParty} disabled={disabled} >Add</Button>
      </form> 
     </div>
    </div>
  );
}

export default AddPartyModal;
