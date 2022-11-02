import React from 'react';


const AdminDashboard = () => {
  return (
    <div className='pl-[330px] pt-[150px]'>
      <h1 className='text-[28px] font-bold'>Election Dashboard</h1>
      <h2 className='text-purple-100 mt-8 text-[22px] font-semibold'>Election code</h2>
      <div className='flex gap-4 items-center mt-2'>
          <p className='text-[20px] bg-black-100/5 w-1/2 py-2 px-4  border-black-200 border-2 shadow-inner rounded-md'>{localStorage.election_code}</p>
          
      </div>
    </div>
  );
}

export default AdminDashboard;
