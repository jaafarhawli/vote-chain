import {RiDashboardFill} from 'react-icons/ri';
import {HiUserGroup} from 'react-icons/hi';
import {FaUserTie, FaUserCog, FaUser} from 'react-icons/fa';
import {MdSettings} from 'react-icons/md';
import {TbCloudUpload} from 'react-icons/tb';
import {FcAddDatabase} from 'react-icons/fc';

export const PanelComponents = [

    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: <RiDashboardFill />,
    },
  
    {
      title: 'Moderators',
      path: 'moderators',
      icon: <FaUserCog />
    },
  
    {
      title: 'Parties',
      path: 'parties',
      icon: <HiUserGroup />
    },
  
    {
      title: 'Candidates',
      path: 'candidates',
      icon: <FaUserTie />
    },
    
    {
      title: 'Voters',
      path: 'voters',
      icon: <FaUser />
    },
    
    {
      title: 'Applicants',
      path: 'applicants',
      icon: <FcAddDatabase />
    },
    
    {
      title: 'Settings',
      path: 'settings',
      icon: <MdSettings />
    },
    
    {
      title: 'Launch',
      path: 'Launch',
      icon: <TbCloudUpload />
    },

  ];