import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {Loader, Table, EmptyState, ElectionContainer} from '../../../components/Reusable';
import { viewApplicants } from '../../../api/viewApplicants';
import { removeApplicant } from '../../../api/removeApplicant';

const Applicants = (props) => {
    
    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');

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
    <ElectionContainer title={'Applicants'}>
        <EmptyState title={'No Applicants'}>You don’t have any applicants</EmptyState>
    </ElectionContainer>
    </>
    : 
    <>
    <ElectionContainer title={'Applicants'}>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Applicants'}>You don’t have any applicants</EmptyState> : 
        props.admin ? 
        <Table admin={true} data={filteredData} applicants={true} remove={(id) => removeApplicant(id)} />
        :
        <Table data={filteredData} applicants={true} remove={(id) => removeApplicant(id, election.id, user.id, refetch)} />
        }
    </ElectionContainer>
    </>
    }     
    </>
  );
}

export default Applicants;