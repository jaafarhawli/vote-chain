import React from 'react';
import curve from '../assets/footer.svg';

const LandingFooter = () => {
  return (
    <div>
      <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center h-[150px]' style={{backgroundImage: `url("${curve}")`}}></div>
      <div className='flex flex-col items-center lg:px-28 md:px-10 px-4 bg-purple-100 w-full pb-4'>
          <div className='flex flex-col items-center text-center md:items-start md:text-left md:flex-row w-full pb-8'>
              <div className='flex flex-col flex-1 pb-8'>
                  <h1 className='text-[28px] font-semibold text-purple-200'>About us</h1>
                  <p className='md:w-2/3 text-purple-300'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum laboriosam natus sit temporibus iste est modi dignissimos esse! Dolores magni ipsa quasi fugiat consequuntur voluptates vel ullam natus iure doloribus?</p>
              </div>
              <div className='flex flex-col flex-1 pb-8'>
                  <h1 className='text-[28px] font-semibold text-purple-200'>Vote Chain</h1>
                  <p className='text-purple-300'>Contact us</p>
                  <p className=' text-purple-300'>Reviews</p>
              </div>
          </div>
          <p className='text-purple-300'>Copyright © 2022 Vote Chain</p>
      </div>
    </div>
  );
}

export default LandingFooter;
