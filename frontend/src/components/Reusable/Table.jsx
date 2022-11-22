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
                    <th></th>
                    </>
                    :
                    props.party?
                    <>
                    <th>Name</th>
                    <th></th>
                    </>
                    :
                    props.moderator? 
                    <>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                    </>
                    :
                    props.voter? 
                    <>
                    <th>Name</th>
                    <th>Email</th>
                    <th>ID</th>
                    <th>Wallet Address</th>
                    <th></th>
                    </> : null
                    }
                </tr>
            </thead>
            {props.moderator ?
            <tbody>
            {props.data?.map((moderator) => (
                <tr className='w-full' key={moderator.email}>
                    <td>{moderator.first_name} {moderator.last_name}</td>
                    <td>{moderator.email}</td>
                    <td className=' whitespace-nowrap w-1'>
                        <IoClose className='text-[25px] hover:text-red duration-150' onClick={() => props.remove(moderator._id)} />
                    </td>
                </tr>
            ))}
                
            </tbody>
            :
            props.party ?
            <tbody>
            {props.data?.map((party) => (
                <tr className='relative' key={party.name} onClick={() => props.addCandidate(party._id)}>
                    <td className='w-full'>{party.name}</td>
                    <td>
                        <IoClose className=' text-[25px] hover:text-red duration-150' onClick={(e) => { props.remove(party._id);
                        e.stopPropagation();}} />
                    </td>
                </tr>
            ))}     
            </tbody>
            :
            props.voter? 
            <tbody>
            {props.data?.map((voter) => (
                <tr className='w-full' key={voter.email}>
                    <td>{voter.name}</td>
                    <td>{voter.email}</td>
                    <td>{voter.voter_id}</td>
                    <td>{voter.voter_wallet_address}</td>
                    {props.admin ?
                    <td className=' whitespace-nowrap w-1 '>
                        <IoClose className='text-[25px] hover:text-red duration-150' onClick={() => 
                        props.remove(voter._id)} />
                    </td>
                    : null}                        
                    </tr>
            ))}     
            </tbody>
            :
            props.applicants?
            <tbody>
            {props.data?.map((applicant) => (
                <tr className='w-full' key={applicant.name}>
                    <td>{applicant.email}</td>
                    <td>{applicant.wallet_address}</td>                   
                    {props.admin ?
                    <td className=' whitespace-nowrap w-1'>
                        <IoClose className='text-[25px] hover:text-red duration-150' onClick={() => 
                        props.remove(applicant._id)} />
                    </td>
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
