import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';

const Table = (props) => {

  return (
    <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                    {props.moderator? <th>Email</th>
                    :
                    props.voter? 
                    <>
                    <th>Email</th>
                    <th>ID</th>
                    </> : null
                    }
                </tr>
            </thead>
            {props.moderator ?
            <tbody>
            {props.data?.map((moderator) => (
                <tr className='relative' key={moderator.email}>
                    <td>{moderator.first_name} {moderator.last_name}</td>
                    <td>{moderator.email}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => props.remove(moderator._id)} />
                </tr>
     ))}
                
            </tbody>
            :
            props.party ?
            <tbody>
            {props.data?.map((party) => (
                <tr className='relative' key={party.name} onClick={() => props.addCandidate(party._id)}>
                    <td className='w-full'>{party.name}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={(e) => { props.remove(party._id);
                    e.stopPropagation();}} />
                </tr>
     ))}     
            </tbody>
            :
            props.voter? 
            <tbody>
            {props.data?.map((voter) => (
                <tr className='relative' key={voter.name}>
                    <td>{voter.name}</td>
                    <td>{voter.email}</td>
                    <td>{voter.voter_id}</td>
                    {props.admin ?
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => 
                    props.remove(voter._id)} />
                    : null}
                    </tr>
     ))}     
            </tbody>
            : null
            }
    </table>
  );
}

export default Table;
