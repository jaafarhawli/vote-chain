import React from 'react';
import {TbCopy} from 'react-icons/tb';

const CopyData = (props) => {
  return (
    <div className='flex gap-4 items-center mt-2'>
        <input type="text" value={props.value} readOnly={true} className='text-[20px] bg-black-100/5 w-1/2 py-5 px-4  border-black-200 border-2 shadow-inner rounded-md' />
        <TbCopy className='text-black-200 p-2 border-black-200 border-2 w-[44px] h-[44px] rounded-lg' onClick={() => props.onClick(props.value)}/>
    </div>
  );
}

export default CopyData;
