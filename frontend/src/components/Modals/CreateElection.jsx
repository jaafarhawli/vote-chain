import React, {useState} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import ErrorModal from './ErrorModal';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import Button from '../Reusable/Button';

const CreateElection = ({open, closeModal, refetch}) => {

    const [title, setTitle] = useState();
    const [starttime, setStarttime] = useState();
    const [endtime, setEndtime] = useState();
    const [timezone, setTimezone] = useState();
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const date = new Date().toLocaleString();

    const createElection = async () => {
    
        if(((endtime - starttime)/36e5) < 24) {
            setError("Your election should be 24 hours at least");
            setErrorModal(true);
            return;
        }

        const form = {
            admin_id: localStorage.id,
            title: title,
            start_time: starttime,
            end_time: endtime,
            timezone: timezone
        }
        
        try {
             await axios.post('user/election', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeModal();
            } catch (error) {
                setError(error.message);
                setErrorModal(true);
              console.log(error);
            }
        
    }
    const handleChange = (value) => {
        setTimezone(value);
    }

    if(!open)
    return null;

return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <ErrorModal open={errorModal} error={error} closeError={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>New Election</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <label>
              <p className='font-medium'>Election title</p>
              <input className=' border-[1px] border-black-200' type="text" onChange={e => setTitle(e.target.value)} />
          </label>
          <div className='flex gap-2'>
            <label>
                <p className='font-medium'>Start date</p>
                <DateTimePickerComponent min={date} format="yyyy-mm-dd HH:mm" onChange={e => setStarttime(e.target.value)}></DateTimePickerComponent>
            </label>
            <label>
                <p className='font-medium'>End date</p>
                <DateTimePickerComponent min={date} format="yyyy-mm-dd HH:mm" onChange={e => setEndtime(e.target.value)} ></DateTimePickerComponent>
            </label>
          </div>
          <label>
              <p className='font-medium'>Timezone</p>
              <TimezonePicker
                  
                  placeholder   = "Select timezone..."
                  onChange={handleChange}
                  className='timezone w-full'
                />
             
          </label>
          <Button className='bg-cyan' onClick={createElection}>Create election</Button>
      </form> 
     </div>
    </div>
  );
}


export default CreateElection;
