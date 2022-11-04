import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import FormInput from '../../components/Reusable/FormInput';

const AdminSettings = () => {

    const [title, setTitle] = useState(localStorage.election_title);
    const [starttime, setStarttime] = useState(localStorage.election_start);
    const [endtime, setEndtime] = useState(localStorage.election_end);
    const [timezone, setTimezone] = useState(localStorage.election_timezone);
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const date = new Date().toLocaleString();

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
      }, [title, starttime, endtime, timezone]);

  return (
    <div className='pl-[330px] pt-[150px] pr-6 flex flex-col'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Settings</h1>
          <Button className='bg-red'>Delete Election</Button>
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
          <Button className='bg-cyan' disabled={disabled} >Save Changes</Button>
      </form> 
    </div>
  );
}

export default AdminSettings;
