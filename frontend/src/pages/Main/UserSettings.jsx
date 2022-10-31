import React, {useState} from 'react';
import MainHeader from '../../components/MainHeader';

const UserSettings = () => {

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();

  return (
    <div>
      <MainHeader title={'Account Settings'} empty={true} />
      <form className='w-2/5 flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Account Info</h1>
            <label>
                <p className='font-medium'>First Name</p>
                <input type="text" className=' border-[1px] border-black-200' onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>Last Name</p>
                <input type="text" className=' border-[1px] border-black-200' onChange={e => setLastname(e.target.value)}/>
            </label>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email" className=' border-[1px] border-black-200' onChange={e => setEmail(e.target.value)}/>
          </label>
          <button>Save changes</button>
        </form>
        <form className='mt-12 w-2/5 flex flex-col gap-5 lg:px-28 md:px-10 px-4'>
          <h1 className='text-[28px] font-semibold text-purple-100'>Change Password</h1>
            <label>
                <p className='font-medium'>Old Password</p>
                <input type="password" className=' border-[1px] border-black-200' onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>New Password</p>
                <input type="text" className=' border-[1px] border-black-200' onChange={e => setLastname(e.target.value)}/>
            </label>
          <button>Save changes</button>
        </form>
    </div>
  );
}

export default UserSettings;
