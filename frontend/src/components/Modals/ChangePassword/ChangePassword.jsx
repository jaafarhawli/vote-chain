import React, {useState, useEffect} from 'react';
import {Button, FormInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal';
import { useSelector } from 'react-redux';
import { changePassword } from './ChangePasswordFunction';

const ChangePassword = ({open, closeModal}) => {

    const user = useSelector((state) => state.user.value);

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [disabled, setDisabled] = useState();

    const handleClick = async() => {
        const res = await changePassword(confirm, password, user.id, oldPassword);
        setMessage(res.message);
        setIsError(res.isError);
        setSuccessModal(res.successModal);
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
      <Modal title={'Change Password'} closeModal={closeModal} dark={true} content={
        <form className='w-4/5 flex flex-col gap-5 '>
        <FormInput type="password" textStyle='text-white' onChange={e => setOldPassword(e.target.value)}>Old Password</FormInput>
        <FormInput type="password" textStyle='text-white' onChange={e => setPassword(e.target.value)}>New Password</FormInput>
        <FormInput type="password" textStyle='text-white' onChange={e => setConfirm(e.target.value)}>Confirm New Password</FormInput>
        <Button className=' bg-cyan' onClick={handleClick} disabled={disabled}>Save changes</Button>
        </form> 
      } />
    <SuccessModal open={successModal} message={message} error={isError} closeSuccess={() => setSuccessModal(false)} />
    </div> 
    );
}

export default ChangePassword;
