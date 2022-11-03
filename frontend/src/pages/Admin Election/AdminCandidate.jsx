import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import CandidateCard from '../../components/Reusable/CandidateCard';

const AdminCandidate = () => {
    
    const [search, setSearch] = useState('');

    const {data} = useQuery([], async () => {
        return axios.get(`user/candidates/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    console.log(data);
    
    return (
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Candidates</h1>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <div className='grid grid-cols-4 gap-4 justify-between mt-8'>
            <CandidateCard />
        </div>
    </div>
  );
}

export default AdminCandidate;
