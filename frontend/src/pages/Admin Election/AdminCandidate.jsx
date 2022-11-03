import React, {useState} from 'react';

const AdminCandidate = () => {
    
    const [search, setSearch] = useState('');
    
    return (
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
    </div>
  );
}

export default AdminCandidate;
