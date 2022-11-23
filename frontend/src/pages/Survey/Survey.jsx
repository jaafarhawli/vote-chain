import React from 'react';
import SurveyForm from './SurveyForm';
import {useQuery} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

const Survey = () => {

    const param = useParams();

  const {data} = useQuery(["survey"], async () => {
    return axios.get(`voter/election/${param.code}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data);
    })

  return (
      <>
      {data ?
    <div className='bg-gradient-to-r from-bg to-purple-100  flex w-full h-screen justify-center items-center'>
      <div className='flex md:w-1/2 justify-center items-center'>
          <SurveyForm />
      </div>
    </div>
       :
       null}
       </>
  );
}

export default Survey;
