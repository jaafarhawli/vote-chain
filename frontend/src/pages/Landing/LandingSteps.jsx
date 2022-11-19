import React from 'react';
import banner from '../../assets/voting.png';
import {MdBallot} from 'react-icons/md';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {FaUserShield} from 'react-icons/fa';
import {ImStatsDots} from 'react-icons/im';

const LandingSteps = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-purple-300 to-purple-400 lg:px-28 md:px-10 px-4 items-center lg:flex-row lg:justify-between pb-12'>
      <img src={banner} alt="/" className='lg:w-2/5 w-1/2 h-[250px] lg:h-[400px] object-cover rounded-lg opacity-90 min-w-[340px] lg:mt-12 mt-6' />
      <div className='flex flex-col  text-center lg:w-1/2'>
        <h1 className='pt-6 font-bold text-[32px] md:text-[36px] text-purple-100 lg:text-[40px]'>Build your own election</h1>
        <p className='pt-2 font-medium text-[20px] text-black-200'>Take control over the election, add some moderators to help you out</p>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <MdBallot className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Create your Election</h2>
                <p>Add as many parties as you want to the election, with candidates for each party</p>
            </div>
        </div>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <AiOutlineUsergroupAdd className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Add Voters</h2>
                <p>Add voters to your election, create a unique password and id for each voter and sent it to them by email </p>
            </div>
        </div>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <FaUserShield className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Add Moderators</h2>
                <p>Add moderators to help you in adding voters to your election</p>
            </div>
        </div>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <ImStatsDots className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Launch your vote and keep track of results</h2>
                <p>Launch your vote and notify the voters, view statistical charts of your live election results, </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSteps;
