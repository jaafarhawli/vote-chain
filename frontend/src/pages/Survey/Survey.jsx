import React from 'react';
import axios from '../../api/axios';
import SurveyForm from './SurveyForm';
import {useQuery} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// This page is a survey sent by the admin to his voters to fill in order to get their emails and wallet addresses 
// which he needs to add them as voters to the election
const Survey = () => {

  const param = useParams();

  // Check if the election code inside the url is valid or not
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
        <div className='bg-bg flex w-full h-screen justify-center items-center'>
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
