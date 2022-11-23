import React, {useState, useEffect} from 'react';
import {IoClose} from 'react-icons/io5';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';

const AddModerator = ({open, closeModal, refetch, socket}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [email, setEmail] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
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
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <SuccessModal open={errorModal} message={error} error={true} closeSuccess={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <IoClose className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Moderator</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormLabelInput type="text" onChange={e => setEmail(e.target.value)}>Moderator Email</FormLabelInput>
          <Button className='bg-cyan' onClick={addModerator} disabled={disabled} >Add</Button>
      </form> 
     </div>
    </div>
  );
}

export default AddModerator;
