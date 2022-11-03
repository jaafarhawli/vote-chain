import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';

const Table = (props) => {

  return (
    <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                    {props.moderator && <th>Email</th>}
                </tr>
            </thead>
            {props.moderator &&
            <tbody>
            {props.data?.map((moderator) => (
                <tr className='relative' key={moderator.email}>
                    <td>{moderator.first_name} {moderator.last_name}</td>
                    <td>{moderator.email}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => props.remove(moderator._id)} />
                </tr>
     ))}
                
            </tbody>}
            {props.party && 
            <tbody>
            {props.data?.map((party) => (
                <tr className='relative' key={party.name} onClick={() => props.addCandidate(party._id)}>
                    <td className='w-full'>{party.name}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => props.remove(party._id)} />
                </tr>
     ))}     
            </tbody>
            }
    </table>
  );
}

export default Table;
