import React, {useState, useEffect} from 'react';
import Flatpickr from "react-flatpickr";
import {SuccessModal, ConfirmModal, closeModal} from '../../../components/Modals';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {FormLabelInput, Button, ElectionContainer} from '../../../components/Reusable';
import { saveInfo } from './SaveInfo';
import {changeTime} from './ChangeTime';
import { deleteElection } from '../../../api/deleteElection';
require("flatpickr/dist/themes/material_blue.css");

const Settings = () => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(election.title);
    const [starttime, setStarttime] = useState(election.startTime);
    const [endtime, setEndtime] = useState(election.endTime);
    const [description, setDescription] = useState(election.description);
    const [successModal, setSuccessModal] = useState(false);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [timeDisabled, setTimeDisabled] = useState(true);
    const [save, setSave] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const launched = election.launched===true;
    const date = new Date();

    const navigate = useNavigate();

    useEffect(() => {
        if (title===election.title && description===election.description)
        setDisabled(true);
        if (starttime===election.startTime && endtime===election.endTime)
        setTimeDisabled(true);
        if(title==='')
        setDisabled(true)
        if(title!==election.title && title!=='')
        setDisabled(false);
        if(starttime!==election.startTime && starttime!=='')
        setTimeDisabled(false);
        if(endtime!==election.endTime && endtime!=='')
        setTimeDisabled(false);
        if(description!==election.description)
        setDisabled(false);
      }, [title, starttime, endtime, description, save, election]);

  return (
      <>
      <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteElection(election.id, user.id, navigate)} text={"Are you sure you want to delete this election?"} />
       <SuccessModal open={successModal} message={message} error={error} closeSuccess={() => 
       {
           setSuccessModal(false);
           document.body.style.overflow = 'unset';
        }} />
    <ElectionContainer title={'Settings'} button={true} onClick={() => setConfirmModal(true)} disabled={launched} buttonContent={'Delete Election'} redButton={true}>
        <form className='w-1/2 flex flex-col gap-5 mt-12'>
        <FormLabelInput type="text" onChange={e => setTitle(e.target.value)} defaultValue={election.title} >Election title</FormLabelInput>       
          <label>
            <p className='font-semibold'>Description</p>
            <textarea defaultValue={election.description? election.description : ""} onChange={e => setDescription(e.target.value)} className='w-full border-[1px] border-black-200 outline-none rounded-sm p-4 text-[16px]' />
          </label>
          <Button className='bg-cyan w-1/2 self-start' disabled={disabled || launched} onClick={() => saveInfo(election.id, user.id, title, description, dispatch, setError, setMessage, setSuccessModal, setSave, save)} >Save Changes</Button>
      </form> 
      <form className='w-1/2 flex flex-col gap-5 mt-12'>
        <div className='flex gap-2 w-full'>
            <label className='flex-1'>
                <p className='font-semibold'>Start date</p>
                <Flatpickr
                  data-enable-time
                  options={{ minDate: date }}
                  value={election.startTime}
                  onChange={dateStr => 
                    setStarttime(dateStr)
                }
                />
            </label>
            <label className='flex-1'>
                <p className='font-semibold'>End date</p>
                <Flatpickr
                  data-enable-time
                  options={{ minDate: date }}
                  value={election.endTime}
                  onChange={dateStr => 
                    setEndtime(dateStr)
                }
                />
            </label>
          </div>
          <Button className='bg-cyan w-1/2 self-start' disabled={timeDisabled || launched} onClick={() => changeTime(starttime, endtime, election.id, user.id, election.address, dispatch, setError, setMessage, setSuccessModal, setSave, save)} >Change Time Interval</Button>
      </form>
      </ElectionContainer>
    </>
  );
}

export default Settings;