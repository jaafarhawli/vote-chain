import React from 'react';
import {IoClose} from 'react-icons/io5';
import Button from './Button';

const CandidateCard = (props) => {
  return (
    <>
    {props.vote ? 
    <div className={props.selected ? 'w-[200px] h-[240px] bg-purple-100 rounded-lg flex flex-col p-4 items-center relative' : 'w-[200px] h-[240px] bg-purple-200 rounded-lg flex flex-col p-4 items-center relative'}>
      <img src={props.image} alt="" className='rounded-full w-[130px] h-[130px] bg-white object-contain' />
      <h2 className='mt-2 font-bold text-[18px]'>{props.name}</h2>
      <Button className={props.selected? 'bg-white text-cyan mt-2 w-2/3 disabled:bg-white' : 'mt-2 w-2/3'} disabled={props.selected ? true : false} onClick={props.select} >{props.selected? 'Selected' : 'Select'}</Button>
    </div> :
    <div className='w-[200px] h-[240px] bg-purple-200 rounded-lg flex flex-col p-4 items-center relative'>
      <IoClose className='absolute left-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => props.remove(props.id, props.party_id)} />
      <img src={props.image} alt="" className='rounded-full w-[130px] h-[130px] bg-white object-contain' />
      <h2 className='mt-2 font-bold text-[18px]'>{props.name}</h2>
      <h3>{props.party}</h3>
    </div>}
    </>
  );
}

export default CandidateCard;
