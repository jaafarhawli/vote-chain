import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';
import axios from '../../api/axios';
import ConfirmModal from '../../components/ConfirmModal';

const UserSettings = () => {

  const [firstname, setFirstname] = useState(localStorage.firstname);
  const [lastname, setLastname] = useState(localStorage.lastname);
  const [email, setEmail] = useState(localStorage.email);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState('');
  const [openConfirmModal, setOpenConfirmModal] = useState(true);

  const saveInfo = async() => {
    const form = {
        id: localStorage.id,
        first_name: firstname,
        last_name: lastname,
        email: email,
    }
    try {
      const accountInfo = await axios.put('user/account', form, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      localStorage.setItem('firstname', firstname);
      localStorage.setItem('lastname', lastname);
      localStorage.setItem('email', email);
      console.log(accountInfo);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
}
  
const changePassword = async() => {

    if(confirm!==password) {
        setError('Passwords didnt match');
        return;
    }

    const form = {
        id: localStorage.id,
        old_password: oldPassword,
        password: password,
    }
    try {
      const updatedPassword = await axios.put('user/password', form, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
 
      console.log(updatedPassword);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
}

  return (
    <div>
      <ConfirmModal open={openConfirmModal} />
      <MainHeader title={'Account Settings'} empty={true} />
      <form className='lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Account Info</h1>
            <label>
                <p className='font-medium'>First Name</p>
                <input type="text" className=' border-[1px] border-black-200' defaultValue={localStorage.firstname} onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>Last Name</p>
                <input type="text" className=' border-[1px] border-black-200' defaultValue={localStorage.lastname}  onChange={e => setLastname(e.target.value)}/>
            </label>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email" className=' border-[1px] border-black-200' defaultValue={localStorage.email}  onChange={e => setEmail(e.target.value)}/>
          </label>
          <button type='button' className=' bg-cyan' onClick={saveInfo}>Save changes</button>
        </form>
        <form className='my-12 lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Change Password</h1>
            <label>
                <p className='font-medium'>Old Password</p>
                <input type="password" className=' border-[1px] border-black-200' onChange={e => setOldPassword(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>New Password</p>
                <input type="password" className=' border-[1px] border-black-200' onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>Confirm New Password</p>
                <input type="password" className=' border-[1px] border-black-200' onChange={e => setConfirm(e.target.value)}/>
            </label>
          <button type='button' className=' bg-cyan' onClick={changePassword}>Save changes</button>
          <button className='bg-red'>Delete Account</button>
        </form>
        
    </div>
  );
}

export default UserSettings;
