import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';

const ModeratorElections = () => {

    const navigate = useNavigate();

    const {data: moderator_elections} = useQuery(["moderator"], async () => {
        return axios.get(`user/elections/moderator/${localStorage.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    if(moderator_elections?.length===0) 
    return (
        <div>
            <MainHeader empty={true} />
            <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
                <h1 className='text-[24px] font-semibold text-black-200'>No Elections</h1>
                <p className='w-[220px]'>You're not assigned as moderator to any election'</p>
            </div>
        </div>
    )
}

export default ModeratorElections;
