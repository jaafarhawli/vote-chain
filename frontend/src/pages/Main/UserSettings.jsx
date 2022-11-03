import React, {useState} from 'react';
import MainHeader from './MainHeader';
import axios from '../../api/axios';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import ErrorModal from '../../components/Modals/ErrorModal';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';

const UserSettings = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState(localStorage.firstname);
  const [lastname, setLastname] = useState(localStorage.lastname);
  const [email, setEmail] = useState(localStorage.email);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const saveInfo = async() => {
    const form = {
        id: localStorage.id,
        first_name: firstname,
        last_name: lastname,
        email: email,
    }
    try {
      await axios.put('user/account', form, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      localStorage.setItem('firstname', firstname);
      localStorage.setItem('lastname', lastname);
      localStorage.setItem('email', email);
      setSuccessModal(true);
    } catch (error) {
      setError(error.message);
      setErrorModal(true);
      console.log(error);
    }
}
  
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

const openModal = () => {
  setOpenConfirmModal(true);
  document.body.style.overflow = 'hidden';
}

const closeModal = () => {
  setOpenConfirmModal(false);
  document.body.style.overflow = 'unset';

}

const logout = () => {
  localStorage.clear();      
  navigate('/');
}


const deleteAccount = async () => {
  const form = {
      id: localStorage.id
  }
  
  try {
      await axios.post('user/account', form, {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        });
        localStorage.clear(); 
        document.body.style.overflow = 'unset';
        navigate('/');
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div>
      <ConfirmModal open={openConfirmModal} closeModal={closeModal} click={deleteAccount} text={"Are you sure you want to delete your account?"} />
      <ErrorModal open={errorModal} error={error} closeError={() => setErrorModal(false)} />
      <SuccessModal open={successModal} closeSuccess={() => setSuccessModal(false)} />
      <MainHeader title={'Account Settings'} empty={true} />
      <form className='lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Account Info</h1>
            <FormInput type="text" onChange={e => setFirstname(e.target.value)} defaultValue={localStorage.firstname}>First Name</FormInput>
            <FormInput type="text" defaultValue={localStorage.lastname}  onChange={e => setLastname(e.target.value)}>Last Name</FormInput>
            <FormInput type="text" defaultValue={localStorage.email}  onChange={e => setEmail(e.target.value)}>Email</FormInput>
          <Button className=' bg-cyan' onClick={saveInfo}>Save changes</Button>
        </form>
        <form className='my-12 lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Change Password</h1>
            <FormInput type="password" onChange={e => setOldPassword(e.target.value)}>Old Password</FormInput>
            <FormInput type="password" onChange={e => setPassword(e.target.value)}>New Password</FormInput>
            <FormInput type="password" onChange={e => setConfirm(e.target.value)}>Confirm New Password</FormInput>
          <Button className=' bg-cyan' onClick={changePassword}>Save changes</Button>
          <div className='flex w-full gap-2'>
            <Button className='bg-red flex-1 hover:bg-red/80'  onClick={logout} >Log out</Button>
            <Button className='bg-red flex-1 hover:bg-red/80'  onClick={openModal} >Delete Account</Button>
          </div>
        </form>      
    </div>
  );
}

export default UserSettings;
