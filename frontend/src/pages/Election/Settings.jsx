import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import FormInput from '../../components/Reusable/FormInput';
import axios from '../../api/axios';
import SuccessModal from '../../components/Modals/SuccessModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

    const [title, setTitle] = useState(localStorage.election_title);
    const [starttime, setStarttime] = useState(localStorage.election_start);
    const [endtime, setEndtime] = useState(localStorage.election_end);
    const [timezone, setTimezone] = useState(localStorage.election_timezone);
    const [successModal, setSuccessModal] = useState(false);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [save, setSave] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const date = new Date().toLocaleString();

    const navigate = useNavigate();

    const saveInfo = async() => {

        if(((endtime - starttime)/36e5) < 24) {
            setMessage("Your election should be 24 hours at least");
            setError(true);
            setSuccessModal(true);
            return;
        }

        const form = {
            id: localStorage.election_id,
            title: title,
            start_time: starttime,
            end_time: endtime,
            timezone: timezone
        }
        try {
          await axios.put('user/election', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          localStorage.setItem('election_title', title);
          localStorage.setItem('election_start', starttime);
          localStorage.setItem('election_end', endtime);
          localStorage.setItem('election_timezone', timezone);
          setError(false);
          setMessage('Election updated succussfully');
          setSuccessModal(true);
          setSave(!save);
        } catch (error) {
            setError(true);
            setMessage(error.message);
            setSuccessModal(true);
          console.log(error);
        }
    }

    const deleteElection = async () => {
        const form = {
            election_id: localStorage.election_id 
        }
        
        try {
            await axios.post('user/election/delete', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              navigate('/main');
            } catch (error) {
              console.log(error);
            }
    }

    const closeConfirm = () => {
        setConfirmModal(false);
        document.body.style.overflow = 'unset';
    }

    const handleChange = (value) => {
        setTimezone(value);
    }

    useEffect(() => {
        if (title===localStorage.election_title && timezone===localStorage.election_timezone && starttime===localStorage.election_start && endtime===localStorage.election_end)
        setDisabled(true);
        if(title==='' || timezone==='')
        setDisabled(true)
        if(title!==localStorage.election_title && title!=='')
        setDisabled(false);
        if(starttime!==localStorage.election_start && starttime!=='')
        setDisabled(false);
        if(endtime!==localStorage.election_end && endtime!=='')
        setDisabled(false);
        if(timezone!==localStorage.election_timezone && timezone!=='')
        setDisabled(false);
      }, [title, starttime, endtime, timezone, save]);

  return (
      <>
      <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteElection} text={"Are you sure you want to delete this election?"} />
       <SuccessModal open={successModal} message={message} error={error} closeSuccess={() => 
       {
           setSuccessModal(false);
           document.body.style.overflow = 'unset';
        }} />
    <div className='pl-[330px] pt-[150px] pr-6 flex flex-col'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Settings</h1>
          <Button className='bg-red' onClick={() => setConfirmModal(true)}>Delete Election</Button>
        </div>
        <form className='w-[400px] flex flex-col gap-5 mt-12'>
          <FormInput type="text" onChange={e => setTitle(e.target.value)} defaultValue={localStorage.election_title} >Election title</FormInput>          
          <div className='flex gap-2'>
            <label>
                <p className='font-semibold'>Start date</p>
                <DateTimePickerComponent min={date} format="yyyy-mm-dd HH:mm" onChange={e => setStarttime(e.target.value)}></DateTimePickerComponent>
            </label>
            <label>
                <p className='font-semibold'>End date</p>
                <DateTimePickerComponent min={date} format="yyyy-mm-dd HH:mm" onChange={e => setEndtime(e.target.value)} ></DateTimePickerComponent>
            </label>
          </div>
          <label>
              <p className='font-semibold'>Timezone</p>
              <TimezonePicker
                  defaultValue = {localStorage.election_timezone}
                  placeholder   = "Select timezone..."
                  onChange={handleChange}
                  className='timezone w-full'
                />           
          </label>
          <Button className='bg-cyan' disabled={disabled} onClick={saveInfo} >Save Changes</Button>
      </form> 
    </div>
    </>
  );
}

export default Settings;