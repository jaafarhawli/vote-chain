import React, {useState, useMemo} from 'react';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {Loader, Table, EmptyState, Button} from '../../components/Reusable';
import { viewApplicants } from '../../api/viewApplicants';

const Applicants = (props) => {
    
    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const launched = election.launched===true;

    const removeApplicant = async (id) => {
        const form = {
            applier_id: id,
            election_id: election.id,
            user_id: user.id 
        }
        
        try {
            await axios.post('voter/remove/applicant', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
            });
            refetch();
        } 
        catch (error) {
            console.log(error.response.data.message);
        }
    }

    const {data, refetch, isFetching} = useQuery(["applicants"], () => viewApplicants(election.id));

    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.email?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])


  return (
    <>
    {
    isFetching ? 
    <Loader loading={isFetching} admin={true} />
    :
    data?.length===0 ?
    <>
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <h1 className='text-[28px] font-bold'>Applicants</h1>
        <EmptyState title={'No Applicants'}>You don’t have any applicants</EmptyState>
    </div>
    </div>
    </>
    : 
    <>
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
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
    </div>
    </>
    }     
    </>
  );
}

export default Applicants;
