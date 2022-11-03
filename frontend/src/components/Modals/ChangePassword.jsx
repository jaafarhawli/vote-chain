import React, {useState} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import FormInput from '../Reusable/FormInput';

const ChangePassword = ({open, closeModal}) => {

    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    const changePassword = async() => {

        if(confirm!==password) {
            setError('Passwords didnt match');
            setErrorModal(true);
            return;
        }
    
        const form = {
            id: localStorage.id,
            old_password: oldPassword,
            password: password,
        }
        try {
          await axios.put('user/password', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
     
          setSuccessModal(true);
    
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
        <SuccessModal open={successModal} closeSuccess={() => setSuccessModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Change Password</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
            <FormInput type="password" onChange={e => setOldPassword(e.target.value)}>Old Password</FormInput>
            <FormInput type="password" onChange={e => setPassword(e.target.value)}>New Password</FormInput>
            <FormInput type="password" onChange={e => setConfirm(e.target.value)}>Confirm New Password</FormInput>
            <Button className=' bg-cyan' onClick={changePassword}>Save changes</Button>
      </form> 
     </div>
    </div>
  );
}

export default ChangePassword;
