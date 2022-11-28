import React, {useState, useEffect} from 'react';
import {Button, FormLabelInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useSelector } from 'react-redux';
import { createElection } from './CreateElectionFunction';
require("flatpickr/dist/themes/material_blue.css");

const CreateElection = ({open, closeModal, refetch}) => {

    const user = useSelector((state) => state.user.value);

    const [title, setTitle] = useState('');
    const [starttime, setStarttime] = useState('');
    const [endtime, setEndtime] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const date = new Date()
    const offset = new Date().getTimezoneOffset()
    const epoch = new Date(`01/01/1970 ${-offset/60}:00:00`);

    const handleClick = async () => {
        const res = createElection(endtime, starttime, epoch, user.id, title, refetch, closeModal);
        setError(res.error);
        setErrorModal(res.errorModal);
    }

    useEffect(() => {
        if(title==='' || starttime==='' || endtime==='')
        setDisabled(true)
        else
        setDisabled(false)
      }, [title, starttime, endtime]);

return (
    <>
    {open ? 
    <div>
    <Modal title={'New Election'} closeModal={closeModal} dark={true} content={
      <form className='w-4/5 flex flex-col gap-5 '>
        <FormLabelInput type="text" textStyle='text-white' onChange={e => setTitle(e.target.value)}>Election title</FormLabelInput>          
        <div className='flex gap-2'>
          <label>
              <p className='font-medium text-white'>Start date</p>
              <Flatpickr
                data-enable-time
                options={{ minDate: date }}
                value={starttime}
                onChange={dateStr => 
                  setStarttime(dateStr)
              }
              />
          </label>
          <label>
              <p className='font-medium text-white'>End date</p>
              <Flatpickr
                data-enable-time
                options={{ minDate: date }}
                value={endtime}
                onChange={dateStr => 
                  setEndtime(dateStr)
              }
              />
          </label>
        </div>
        <Button className='bg-cyan' onClick={handleClick} disabled={disabled} >Create election</Button>
      </form>
    } />
   <SuccessModal open={errorModal} message={error} error={true} closeError={() => setErrorModal(false)} />
  </div>
  :
  null}
  </> 
  );
}


export default CreateElection;