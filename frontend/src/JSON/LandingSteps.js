import {MdBallot} from 'react-icons/md';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';
import {FaUserShield} from 'react-icons/fa';
import {ImStatsDots} from 'react-icons/im';

const steps = [
    {
        title: 'Create your Election',
        content: 'Add as many parties as you want to the election, with candidates for each party',
        icon:  <MdBallot className='text-white text-[30px]' />
    },

    {
        title: 'Add Voters',
        content: 'Add voters to your election, each  voter will have a unique id and key sent to them by email',
        icon:  <AiOutlineUsergroupAdd className='text-white text-[30px]' />
    },

    {
        title: 'Add Moderators',
        content: 'Add moderators to help you in adding voters to your election',
        icon:  <FaUserShield className='text-white text-[30px]' />
    },

    {
        title: 'Launch your election and keep track of results',
        content: 'Launch your election, view statistical charts of your live election results',
        icon:  <ImStatsDots className='text-white text-[30px]' />
    },
];

export default steps;