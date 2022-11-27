import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import axios from '../../api/axios';
import SuccessModal from '../../components/Modals/SuccessModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useSelector, useDispatch } from 'react-redux';
import {viewElection} from '../../redux/election';
import { changeTimeInterval } from '../../Web3';
import FormLabelInput from '../../components/Reusable/FormLabelInput';
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

    const saveInfo = async() => {
        const form = {
            election_id: election.id,
            user_id: user.id,
            title: title,
            description: description
        }
        try {
          await axios.put('election', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          dispatch(viewElection({
            title: title,
            description: description,
          }));
          setError(false);
          setMessage('Election updated succussfully');
          setSuccessModal(true);
          setSave(!save);
        } catch (error) {
            setError(true);
            setMessage(error.response.data.message);
            setSuccessModal(true);
          console.log(error);
        }
    }

    const changeTime = async () => {
      const startdate = new Date(starttime);
      const enddate = new Date(endtime);
      const offset = new Date().getTimezoneOffset()
      const epoch = new Date(`01/01/1970 ${-offset/60}:00:00`);
      const unixStartDate = Math.floor((new Date(starttime) - epoch) / 1000);
      const unixEndDate = Math.floor((new Date(endtime)- epoch) / 1000);

      if((enddate - startdate) < 0) {
        setError(true);
        setMessage("Your election end time should be ahead of the start time");
        setSuccessModal(true);
        return;
      }
      
      if(((enddate - startdate)/36e5) < 24) {
        setError(true);
        setMessage("Your election should be 24 hours at least");
        setSuccessModal(true);
        return;
      }
      await changeTimeInterval(unixStartDate, unixEndDate, election.address);
      const form = {
        start_time: starttime,
        end_time: endtime,
        user_id: user.id,
        election_id: election.id,
      }
      try {
        await axios.put('election', form, {
          headers: {
            Authorization: `bearer ${localStorage.token}`
          }
        });
      } catch (error) {
      setError(true);
      setMessage(error.response.data.message);
      setSuccessModal(true);
     console.log(error);
    }
      dispatch(viewElection({
        startTime: starttime,
        endTime: endtime,
      }));
      setError(false);
      setMessage('Election updated succussfully');
      setSuccessModal(true);
      setSave(!save);
    }

    const deleteElection = async () => {
        const form = {
            election_id: election.id, 
            user_id: user.id 
        }
        
        try {
            await axios.post('election/delete', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              navigate('/main');
            } catch (error) {
              console.log(error.response.data.message);
            }
    }

    const closeConfirm = () => {
        setConfirmModal(false);
        document.body.style.overflow = 'unset';
    }

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
      <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteElection} text={"Are you sure you want to delete this election?"} />
       <SuccessModal open={successModal} message={message} error={error} closeSuccess={() => 
       {
           setSuccessModal(false);
           document.body.style.overflow = 'unset';
        }} />
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Settings</h1>
          <Button className='bg-red' disabled={launched} onClick={() => setConfirmModal(true)}>Delete Election</Button>
        </div>
        <form className='w-1/2 flex flex-col gap-5 mt-12'>
        <FormLabelInput type="text" onChange={e => setTitle(e.target.value)} defaultValue={election.title} >Election title</FormLabelInput>       
          <label>
            <p className='font-semibold'>Description</p>
            <textarea defaultValue={election.description? election.description : ""} onChange={e => setDescription(e.target.value)} className='w-full border-[1px] border-black-200 outline-none rounded-sm p-4 text-[16px]' />
          </label>
          <Button className='bg-cyan w-1/2 self-start' disabled={disabled || launched} onClick={saveInfo} >Save Changes</Button>
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
          <Button className='bg-cyan w-1/2 self-start' disabled={timeDisabled || launched} onClick={changeTime} >Change Time Interval</Button>
      </form>
    </div>
    </div>
    </>
  );
}

export default Settings;
