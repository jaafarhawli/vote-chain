import React from 'react';

const Applicants = () => {
  
    const [search, setSearch] = useState('');
    const [refetch, setRefetch] = useState(true);
    const launched = localStorage.election_launched==="true";


  return (
    <>
    {data?.length===0 ?
    <>
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <h1 className='text-[28px] font-bold'>Voters</h1>
        <EmptyState title={'No Voters'} button={'Add voter'} disabled={launched} onClick={openModal}>You don’t have any voters, add one now!</EmptyState>
    </div>
    </>
    : 
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteVoter} text={"Are you sure you want to delete this voter?"} />
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
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
