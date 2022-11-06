import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';

const LandingSignup = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-[#F9F8FF] flex flex-col w-full lg:px-28 md:px-10 px-4 items-center'>
        <h1 className='text-center lg:text-[40px] md:text-[36px] text-[28px] font-medium pb-8'>Don’t miss your opportunity <br/>
 Create your account and launch your election now</h1>
      <Button className='w-[200px] hover:text-white' onClick={() => navigate('/register')}>Signup</Button>
    </div>
  );
}

export default LandingSignup;
