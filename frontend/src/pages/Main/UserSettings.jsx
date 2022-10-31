import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';

const UserSettings = () => {

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState('');

  return (
    <div>
      <MainHeader title={'Account Settings'} empty={true} />
      <form className='lg:w-[600px] w-[400px] flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Account Info</h1>
            <label>
                <p className='font-medium'>First Name</p>
                <input type="text" className=' border-[1px] border-black-200' value={localStorage.firstname} onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>Last Name</p>
                <input type="text" className=' border-[1px] border-black-200' value={localStorage.lastname}  onChange={e => setLastname(e.target.value)}/>
            </label>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email" className=' border-[1px] border-black-200' value={localStorage.email}  onChange={e => setEmail(e.target.value)}/>
          </label>
          <button>Save changes</button>
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
          <button>Save changes</button>
          <button className='bg-red'>Delete Account</button>
        </form>
    </div>
  );
}

export default UserSettings;
