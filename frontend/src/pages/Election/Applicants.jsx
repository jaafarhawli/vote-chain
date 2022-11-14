import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';
import Button from '../../components/Reusable/Button';
import Table from '../../components/Reusable/Table';

const Applicants = (props) => {
  
    const [search, setSearch] = useState('');
    const [refetch, setRefetch] = useState(true);
    const launched = localStorage.election_launched==="true";

    const {data} = useQuery([refetch], async () => {
        return axios.get(`election/view/applyers/${localStorage.election_id}`, {
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
        <h1 className='text-[28px] font-bold'>Voters</h1>
        <EmptyState title={'No Voters'} button={'Add voter'} disabled={launched} onClick={openModal}>You don’t have any voters, add one now!</EmptyState>
    </div>
    </>
    : 
    <>
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Voters</h1>
          <Button add={true} onClick={openModal} disabled={launched} >Add Voter</Button>
        </div>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Voters'}>You don’t have any voters</EmptyState> : 
        props.admin ? 
        <Table admin={true} data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        :
        <Table data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        }
    </div>
    </>
    }     
    </>
  );
}

export default Applicants;
