import React, {useState, useEffect} from 'react';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import axios from '../../api/axios';
import SuccessModal from '../../components/Modals/SuccessModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
require("flatpickr/dist/themes/material_blue.css");

const Settings = () => {

    const [title, setTitle] = useState(localStorage.election_title);
    const [starttime, setStarttime] = useState(localStorage.election_start);
    const [endtime, setEndtime] = useState(localStorage.election_end);
    const [description, setDescription] = useState(localStorage.election_description);
    const [successModal, setSuccessModal] = useState(false);
    const [error, setError] = useState(true);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [save, setSave] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
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
            election_id: localStorage.election_id,
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
          setStarttime(localStorage.election_start);
          setEndtime(localStorage.election_end);
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
            election_id: localStorage.election_id, 
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
        if (title===localStorage.election_title && starttime===localStorage.election_start && endtime===localStorage.election_end && description===localStorage.election_description)
        setDisabled(true);
        if(title==='')
        setDisabled(true)
        if(title!==localStorage.election_title && title!=='')
        setDisabled(false);
        if(starttime!==localStorage.election_start && starttime!=='')
        setDisabled(false);
        if(endtime!==localStorage.election_end && endtime!=='')
        setDisabled(false);
        if(description!==localStorage.election_description)
        setDisabled(false);
      }, [title, starttime, endtime, description, save]);

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
                <p className='font-semibold'>End date</p>
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
          <label>
            <p className='font-semibold'>Description</p>
            <textarea defaultValue={localStorage.election_description? localStorage.election_description : ""} onChange={e => setDescription(e.target.value)} className='w-full border-[1px] border-black-200 outline-none rounded-sm p-4 text-[16px]' />
          </label>
          <Button className='bg-cyan' disabled={disabled} onClick={saveInfo} >Save Changes</Button>
      </form> 
    </div>
    </>
  );
}

export default Settings;
