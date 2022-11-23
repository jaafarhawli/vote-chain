import React, { useState, useEffect } from 'react';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';
import {IoIosNotifications} from 'react-icons/io';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import {IoCloseCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
 
const MainHeader = ({title, empty, open, refetch}) => {

    const navigate = useNavigate();
    const param = useParams();
    const user = useSelector((state) => state.user.value);

    const [showNotifications, setShowNotifications] = useState(false);
    const [active, setActive] = useState();   
    
    const {data, refetch: refetchNotifications} = useQuery(["notifications"], async () => {
      return axios.get(`user/notifications/${user.id}`, {
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
        user_id: user.id,
        election_id: election_id
     }   
      try {
           await axios.post('user/notifications/accept', form, {
              headers: {
                Authorization: `bearer ${localStorage.token}`
              }
            });
            refetchNotifications();
            refetch();
          } catch (error) {
            console.log(error);
          }  
    }  
    
    const rejectRequest = async (election_id) => {
      const form = {
        user_id: user.id,
        election_id: election_id
     }   
      try {
           await axios.post('user/notifications/reject', form, {
              headers: {
                Authorization: `bearer ${localStorage.token}`
              }
            });
            refetchNotifications();
            refetch();
          } catch (error) {
            console.log(error);
          }  
    } 
    
    useEffect(() => {
      console.log(param['*']);
      if(param['*'] === 'moderate')
      setActive(2);
      else if(param['*'] === 'settings')
      setActive(3);
      else
      setActive(1);
    }, [param]);

    return (
    <div>
      <div className='flex flex-col md:px-10 px-4 bg-gradient-to-b from-purple-100/30 to-purple-100/10 w-full py-6 rounded-lg'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-36' />
            <div className='flex gap-3 text-white font-semibold items-center'>
                <div className='relative'>
                  <IoIosNotifications onClick={viewNotifications} className={data?.length===0 ? 'text-[28px] hover:text-cyan duration-150' : 'text-[28px] hover:text-cyan duration-150 text-yellow'} />
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
                          <IoCheckmarkCircleOutline className='text-green text-[24px] hover:text-black-100 duration-150' onClick={() => acceptRequest(notification.election_id)} />
                          <IoCloseCircleOutline className='text-red text-[24px] hover:text-black-100 duration-150' onClick={() => rejectRequest(notification.election_id)} />
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
                <Button onClick={() => navigate('/main/settings')} className=' bg-bg/0 neon'>{user.firstName} {user.lastName}</Button>
            </div>
        </div>
        <div className='flex w-full mt-6 gap-2'>
          <div className='flex-1 text-center text-white font-bold'>
            <h2 className={active === 1 ? 'bg-purple-300/50 duration-150 p-2 select-none cursor-pointer' : 'hover:bg-purple-300/50 duration-150 p-2 select-none cursor-pointer'} onClick={() => navigate('/main')}>Admin</h2>
          </div>
          <div className='flex-1 text-center text-white font-bold'>
              <h2 className={active === 2 ? 'bg-purple-300/50 duration-150 p-2 select-none cursor-pointer' : 'hover:bg-purple-300/50 duration-150 p-2 select-none cursor-pointer'} onClick={() => navigate('/main/moderate')}>Moderator</h2>
          </div>
          </div>
      </div>
      <div className='flex justify-between w-full items-center mt-8'>
          <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold '>{title}</h1>
          {!empty && <Button onClick={open} add={true}>Create a new election</Button>}
      </div>
    </div>
  );
}

export default MainHeader;
