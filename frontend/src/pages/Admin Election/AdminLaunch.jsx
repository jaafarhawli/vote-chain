import React from 'react';
import Button from '../../components/Reusable/Button';

const AdminLaunch = () => {
  return (
    <div className='items-center pl-[330px] pt-[150px] pr-6 flex flex-col'>
        <h1 className='text-[28px] font-bold'>Launch Election</h1>
        <div className='my-8'>
            <p className='text-[22px] font-semibold'>After you launch your election, you won't be able to:</p>
            <div className='flex flex-col items-start'>
                <ul className='list-disc text-[18px] ml-12 mt-2'>
                    <li>Add or remove parties</li>
                    <li>Add or remove candidates</li>
                    <li>Remove voters</li>
                    <li>Edit election settings</li>
                    <li>Delete election</li>
                </ul>
            </div>
        </div>
            <Button className='mt-4'>Launch</Button>
        
    </div>
  );
}

export default AdminLaunch;
