import React, {useState, useEffect} from 'react';
import MainHeader from './MainHeader';
import axios from '../../api/axios';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import SuccessModal from '../../components/Modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import ChangePassword from '../../components/Modals/ChangePassword/ChangePassword';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user';

const UserSettings = ({socket}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [firstname, setFirstname] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState('');
  const [passwordModal, setPasswordModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [save, setSave] = useState(false);

  const saveInfo = async() => {
    const form = {
        id: user.id,
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
      dispatch(updateUser({
        firstName: firstname,
        lastName: lastname,
        email: email
      }));
      setSave(!save);
      setIsError(false);
      setMessage('Account updated successfully');
      setSuccessModal(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setIsError(true);
      setSuccessModal(true);
      console.log(error.response.data.message);
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
  socket.emit('logout', localStorage.email);
  localStorage.clear();      
  navigate('/');
}

const closePassword = () => {
  setPasswordModal(false);
  document.body.style.overflow = 'unset';
}

const openPassword = () => {
  setPasswordModal(true);
  document.body.style.overflow = 'hidden';
}


const deleteAccount = async () => {
  const form = {
      id: user.id
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
        console.log(error.response.data.message);
      }
  }

  useEffect(() => {
    if (firstname===user.firstName && lastname===user.lastName && email===user.email)
    setDisabled(true);
    if(firstname==='' || lastname==='' || email==='')
    setDisabled(true);
    if(firstname!==user.firstName && firstname!=='')
    setDisabled(false);
    if(lastname!==user.lastName && lastname!=='')
    setDisabled(false);
    if(email!==user.email && email!=='')
    setDisabled(false);

  }, [firstname, lastname, email, save, user, passwordModal]);

  return (
    <div>
      <ConfirmModal open={openConfirmModal} closeModal={closeModal} click={deleteAccount} text={"Are you sure you want to delete your account?"} />
      <SuccessModal open={successModal} message={message} error={isError} closeSuccess={() => setSuccessModal(false)} />
      <ChangePassword open={passwordModal} closeModal={closePassword} />
      <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen flex flex-col gap-12'>
      <MainHeader title={'Account Settings'} empty={true} />
      <div className='w-full flex justify-center'>
      <form className={passwordModal ? 'lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4 py-6' : 'lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4 neon py-6'}>
          <h1 className='text-[28px] font-semibold text-purple-100 text-center'>Account Info</h1>
            <FormInput type="text" textStyle='text-white' onChange={e => setFirstname(e.target.value)} defaultValue={user.firstName}>First Name</FormInput>
            <FormInput type="text" textStyle='text-white' defaultValue={user.lastName}  onChange={e => setLastname(e.target.value)}>Last Name</FormInput>
            <FormInput type="text" textStyle='text-white' defaultValue={user.email}  onChange={e => setEmail(e.target.value)}>Email</FormInput>
          <Button className=' bg-cyan' onClick={saveInfo} disabled={disabled} >Save changes</Button>
          <p className='font-semibold text-purple-100 hover:underline select-none cursor-pointer mb-4' onClick={openPassword} >Change Password?</p>
          <Button className='bg-red flex-1 hover:bg-red/80'  onClick={openModal} >Delete Account</Button>
          <Button className='bg-red flex-1 hover:bg-red/80'  onClick={logout} >Log out</Button>
        </form> 
        </div>  
        <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
    </div>
    </div>
  );
}

export default UserSettings;
