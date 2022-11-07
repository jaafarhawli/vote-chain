import React, { useState } from 'react';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import curve from '../../assets/main-curve.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';
import {IoIosNotifications} from 'react-icons/io';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import {VscWorkspaceTrusted, VscWorkspaceUntrusted} from 'react-icons/vsc';
 
const MainHeader = ({title, empty, open}) => {

    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState(false);   
    const [refetch, setRefetch] = useState(false);   
    
    const {data} = useQuery([refetch], async () => {
      return axios.get(`user/notifications/${localStorage.id}`, {
                  headers: {
                    Authorization: `bearer ${localStorage.token}`
                  }
                }).then((res) => res.data.data);
    })

    const viewNotifications = async () => {
      if(!showNotifications) {
      document.body.style.overflow = 'hidden';
      setShowNotifications(true);
      }
      else {
      document.body.style.overflow = 'unset';
      setShowNotifications(false);
      }
    }

    const acceptRequest = async (election_id) => {
      const form = {
        user_id: localStorage.id,
        election_id: election_id
     }   
      try {
           await axios.post('user/notifications/accept', form, {
              headers: {
                Authorization: `bearer ${localStorage.token}`
              }
            });
            setRefetch(!refetch)
          } catch (error) {
            console.log(error.response.data.message);
          }  
    }  

    return (
    <div>
      <div className='flex flex-col lg:px-28 md:px-10 px-4 bg-gradient-to-b from-black-100 to-black-200 w-full pt-6'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-36' />
            <div className='flex gap-3 text-white font-semibold items-center'>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main')}>Admin</h2>
                <h2 className='hover:bg-purple-300/50 duration-150 p-2 rounded-lg select-none cursor-pointer' onClick={() => navigate('/main/moderate')}>Moderator</h2>
                <div className='relative'>
                  <IoIosNotifications className='text-[28px] hover:text-cyan duration-150' onClick={viewNotifications} />
                  {showNotifications ?
                   <>
                   <div className='absolute right-0 w-[400px] h-[500px] bg-purple-300 rounded-xl p-4 overflow-scroll'>
                    <h1 className='text-black-100 text-[20px]'>Notifications</h1>
                    <div className='w-full bg-black-100 h-[1px]'></div>
                    <div className='grid grid-cols-1 gap-2'>
                    {data?.map((notification) => (
                      <div className='border-b-[1px] pb-2 border-black-100' key={notification._id}>
                        <p className='text-black-100 my-2 font-normal'>{notification.user_email} wants to add you as a moderator to his election "{notification.election_title}</p>
                        <div className='flex gap-4'>
                          <VscWorkspaceTrusted className='text-green text-[24px] hover:text-black-100 duration-150' onClick={() => acceptRequest(notification.election_id)} />
                          <VscWorkspaceUntrusted className='text-red text-[24px] hover:text-black-100 duration-150' />
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                  </>
                  :
                  null
                  }
                </div>
                <Button onClick={() => navigate('/main/settings')}>{localStorage.firstname} {localStorage.lastname}</Button>
            </div>
        </div>
        <div className='flex justify-between w-full items-center mt-8'>
            <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold '>{title}</h1>
            {!empty && <Button onClick={open} add={true}>Create a new election</Button>}
        </div>
      </div>
      <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center md:[100px] h-[60px]' style={{backgroundImage: `url("${curve}")`}}></div>
    </div>
  );
}

export default MainHeader;
