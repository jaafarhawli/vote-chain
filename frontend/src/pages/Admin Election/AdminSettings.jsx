import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import FormInput from '../../components/Reusable/FormInput';

const AdminSettings = () => {

    const [title, setTitle] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');
    const [timezone, setTimezone] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const date = new Date().toLocaleString();

    const handleChange = (value) => {
        setTimezone(value);
    }

    useEffect(() => {
        if(title==='' || starttime==='' || endtime==='' || timezone==='')
        setDisabled(true)
        else
        setDisabled(false)
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
