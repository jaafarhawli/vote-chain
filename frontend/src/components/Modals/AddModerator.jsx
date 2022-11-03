import React, {useState} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import ErrorModal from './ErrorModal';

const AddModerator = ({open, closeModal, refetch}) => {

    const [email, setEmail] = useState();
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');

    const addModerator = async () => {

        const form = {
            email: email,
            election_id: localStorage.election_id
        }
        
        try {
             await axios.post('user/moderator', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeModal();
            } catch (error) {
                setError(error.message);
                setErrorModal(true);
              console.log(error);
            }
        
    }

    if(!open)
    return null;

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <ErrorModal open={errorModal} error={error} closeError={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Moderator</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <label>
              <p className='font-medium'>Moderator Email</p>
              <input className=' border-[1px] border-black-200' type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <Button className='bg-cyan' onClick={addModerator}>Add</Button>
      </form> 
     </div>
    </div>
  );
}

export default AddModerator;
