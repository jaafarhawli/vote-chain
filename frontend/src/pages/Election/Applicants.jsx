import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';
import Button from '../../components/Reusable/Button';
import Table from '../../components/Reusable/Table';
import { useSelector } from 'react-redux';

const Applicants = (props) => {
    
    const election = useSelector((state) => state.election.value);

    const [search, setSearch] = useState('');
    const [refetch, setRefetch] = useState(true);
    const launched = election.launched===true;

    const removeApplicant = async (id) => {
        const form = {
            applier_id: id,
            election_id: election.id,
            user_id: localStorage.id 
        }
        
        try {
            await axios.post('voter/remove/applicant', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
            });
            setRefetch(!refetch)
        } 
        catch (error) {
            console.log(error.response.data.message);
        }
    }

    const {data} = useQuery([refetch], async () => {
        return axios.get(`election/view/applyers/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    console.log(data);

    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.email?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])


  return (
    <>
    {data?.length===0 ?
    <>
    <div className='pl-[330px] pt-[150px] pr-6'>
        <h1 className='text-[28px] font-bold'>Applicants</h1>
        <EmptyState title={'No Applicants'}>You don’t have any applicants</EmptyState>
    </div>
    </>
    : 
    <>
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Applicants</h1>
          <Button add={true} disabled={launched} >Add Applicant</Button>
        </div>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Applicants'}>You don’t have any applicants</EmptyState> : 
        props.admin ? 
        <Table admin={true} data={filteredData} applicants={true} remove={(id) => removeApplicant(id)} />
        :
        <Table data={filteredData} applicants={true} remove={(id) => removeApplicant(id)} />
        }
    </div>
    </>
    }     
    </>
  );
}

export default Applicants;
