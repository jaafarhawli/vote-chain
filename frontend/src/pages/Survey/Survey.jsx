import React from 'react';
import SurveyForm from './SurveyForm';

const Survey = () => {
  return (
    <div className='bg-gradient-to-r from-purple-100 to-purple-200  flex w-full h-screen justify-center items-center'>
      <div className='flex md:w-1/2 justify-center items-center'>
          <SurveyForm />
      </div>
    </div>
  );
}

export default Survey;
