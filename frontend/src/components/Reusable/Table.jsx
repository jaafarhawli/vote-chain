import React from 'react';
import {IoClose} from 'react-icons/io5';

const Table = (props) => {

  return (
    <table className='mt-8'>
            <thead>
                <tr>
                    {props.applicants?
                    <>
                    <th>Email</th>
                    <th>Wallet Address</th>
                    </>
                    :
                    props.party?
                    <th>Name</th>
                    :
                    props.moderator? <th>Email</th>
                    :
                    props.voter? 
                    <>
                    <th>Name</th>
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
                    <IoClose className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => props.remove(moderator._id)} />
                </tr>
            ))}
                
            </tbody>
            :
            props.party ?
            <tbody>
            {props.data?.map((party) => (
                <tr className='relative' key={party.name} onClick={() => props.addCandidate(party._id)}>
                    <td className='w-full'>{party.name}</td>
                    <IoClose className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={(e) => { props.remove(party._id);
                    e.stopPropagation();}} />
                </tr>
            ))}     
            </tbody>
            :
            props.voter? 
            <tbody>
            {props.data?.map((voter) => (
                <tr className='relative' key={voter.email}>
                    <td>{voter.name}</td>
                    <td>{voter.email}</td>
                    <td>{voter.voter_id}</td>
                    {props.admin ?
                    <IoClose className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => 
                    props.remove(voter._id)} />
                    : null}
                    </tr>
            ))}     
            </tbody>
            :
            props.applicants?
            <tbody>
            {props.data?.map((applicant) => (
                <tr className='relative' key={applicant.name}>
                    <td>{applicant.email}</td>
                    <td>{applicant.wallet_address}</td>
                    {props.admin ?
                    <IoClose className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => 
                    props.remove(applicant._id)} />
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
