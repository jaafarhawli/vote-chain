import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import axios from '../../api/axios';
import SuccessModal from '../../components/Modals/SuccessModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useSelector } from 'react-redux';
require("flatpickr/dist/themes/material_blue.css");

const Settings = () => {

    const election = useSelector((state) => state.election.value);

    const [title, setTitle] = useState(election.title);
    const [starttime, setStarttime] = useState(election.startTime);
    const [endtime, setEndtime] = useState(election.endTime);
    const [description, setDescription] = useState(election.description);
    const [successModal, setSuccessModal] = useState(false);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [save, setSave] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const launched = election.launched==="true";
    const date = new Date();

    const navigate = useNavigate();

    const saveInfo = async() => {
      const startdate = new Date(starttime);
      const enddate = new Date(endtime);

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

        const form = {
            election_id: election.id,
            user_id: localStorage.id,
            title: title,
            start_time: starttime,
            end_time: endtime,
            description: description
        }
        try {
          await axios.put('election', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          localStorage.setItem('election_title', title);
          localStorage.setItem('election_start', starttime);
          localStorage.setItem('election_end', endtime);
          localStorage.setItem('election_description', description);
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

    const deleteElection = async () => {
        const form = {
            election_id: election.id, 
            user_id: localStorage.id 
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
        if (title===election.title && starttime===election.startTime && endtime===election.endTime && description===election.description)
        setDisabled(true);
        if(title==='')
        setDisabled(true)
        if(title!==election.title && title!=='')
        setDisabled(false);
        if(starttime!==election.startTime && starttime!=='')
        setDisabled(false);
        if(endtime!==election.endTime && endtime!=='')
        setDisabled(false);
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
    <div className='pl-[330px] pt-[150px] pr-6 flex flex-col'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Settings</h1>
          <Button className='bg-red' disabled={launched} onClick={() => setConfirmModal(true)}>Delete Election</Button>
        </div>
        <form className='w-[400px] flex flex-col gap-5 mt-12'>
          <FormInput type="text" onChange={e => setTitle(e.target.value)} defaultValue={election.title} >Election title</FormInput>          
          <div className='flex gap-2'>
            <label>
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
            <label>
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
          <label>
            <p className='font-semibold'>Description</p>
            <textarea defaultValue={election.description? election.description : ""} onChange={e => setDescription(e.target.value)} className='w-full border-[1px] border-black-200 outline-none rounded-sm p-4 text-[16px]' />
          </label>
          <Button className='bg-cyan' disabled={disabled || launched} onClick={saveInfo} >Save Changes</Button>
      </form> 
    </div>
    </>
  );
}

export default Settings;
