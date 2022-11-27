import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import { useSelector } from 'react-redux';
import FormInput from '../Reusable/FormInput';
import Modal from './Modal';

const ChangePassword = ({open, closeModal}) => {

    const user = useSelector((state) => state.user.value);

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
            id: user.id,
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
    <div>
      <Modal title={'Change Password'} closeModal={closeModal} content={
        <form className='w-4/5 flex flex-col gap-5 '>
        <FormInput type="password" textStyle='text-white' onChange={e => setOldPassword(e.target.value)}>Old Password</FormInput>
        <FormInput type="password" textStyle='text-white' onChange={e => setPassword(e.target.value)}>New Password</FormInput>
        <FormInput type="password" textStyle='text-white' onChange={e => setConfirm(e.target.value)}>Confirm New Password</FormInput>
        <Button className=' bg-cyan' onClick={changePassword} disabled={disabled}>Save changes</Button>
        </form> 
      } />
    <SuccessModal open={successModal} message={message} error={isError} closeSuccess={() => setSuccessModal(false)} />
    </div> 
    );
}

export default ChangePassword;
