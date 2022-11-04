import React, {useState} from 'react';
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

  return (
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Settings</h1>
          <Button className='bg-red'>Delete Election</Button>
        </div>
        <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" onChange={e => setTitle(e.target.value)}>Election title</FormInput>          
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
          <Button className='bg-cyan'>Save Changes</Button>
      </form> 
    </div>
  );
}

export default AdminSettings;
