import {RiDashboardFill} from 'react-icons/ri';
import {FaUser} from 'react-icons/fa';
import {FcAddDatabase} from 'react-icons/fc';

export const PanelComponents = [

    {
      title: 'Dashboard',
      path: 'dashboard',
      icon: <RiDashboardFill />,
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
    }

];
