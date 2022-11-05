import React from 'react';

const ElectionCard = (props) => {

  const local_start = new Date(props.start_time).toString();
  const local_end = new Date(props.end_time).toString();

  return (
    <>
    {props.party? 
    <div className={`px-4 flex items-center py-6 bg-purple-100/60 rounded-lg text-white ${props.className}`} onClick={props.onClick}>
        <h2 className='font-semibold text-[20px]'>{props.title}</h2>
        <div className='flex flex-col lg:w-full lg:flex-row mt-2 lg:gap-2'>
      </div>
    </div> :
    <div className={`px-4 py-8 bg-purple-100/75 rounded-lg text-white ${props.className}`} onClick={props.onClick} key={props.id}>
        <h2 className={`font-semibold text-[20px] ${props.title_size}`}>{props.title}</h2>
        <div className='flex flex-col lg:w-full lg:flex-row mt-2 lg:gap-2'>
          <div className='flex-1'>
              <p className={`text-[13px] ${props.date_size}`}><span className=' font-semibold'>Starts on</span> {local_start}</p>
          </div>
          <div className='flex-1'>
              <p className={`text-[13px] ${props.date_size}`}><span className=' font-semibold '>Ends on</span> {local_end}</p>
          </div>
        </div>
    </div>}
    </>
  );
}

export default ElectionCard;
