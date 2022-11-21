import React, {useState, useEffect} from 'react';
import {IoClose} from 'react-icons/io5';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import FormInput from '../Reusable/FormInput';

const ChangePassword = ({open, closeModal}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [disabled, setDisabled] = useState();

    const changePassword = async() => {

        if(confirm!==password) {
            setMessage('Passwords didnt match');
            setIsError(true);
            setSuccessModal(true);
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
          setIsError(false);
          setMessage('Password updated successfully');
          setSuccessModal(true);
    
        } catch (error) {
          setMessage(error.response.data.message);
          setIsError(true);
          setSuccessModal(true);
          console.log(error.response.data.message);
        }
    }

    useEffect(() => {
      if(oldPassword<8 || password.length<8 || confirm.length<8)
      setDisabled(true)
      else
      setDisabled(false)
    }, [oldPassword, password, confirm]);

    if(!open)
    return null;

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <SuccessModal open={successModal} message={message} error={isError} closeSuccess={() => setSuccessModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <IoClose className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Change Password</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
            <FormInput type="password" onChange={e => setOldPassword(e.target.value)}>Old Password</FormInput>
            <FormInput type="password" onChange={e => setPassword(e.target.value)}>New Password</FormInput>
            <FormInput type="password" onChange={e => setConfirm(e.target.value)}>Confirm New Password</FormInput>
            <Button className=' bg-cyan' onClick={changePassword} disabled={disabled}>Save changes</Button>
      </form> 
     </div>
    </div>
  );
}

export default ChangePassword;
