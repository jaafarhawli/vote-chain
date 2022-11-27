import React, {useState, useEffect} from 'react';
import { createElectionContract } from '../../Web3';
import axios from '../../api/axios';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';
import Modal from '../Reusable/Modal';
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

    const createElection = async () => {
     
        if(((endtime - starttime)/36e5) < 24) {
            setError("Your election should be 24 hours at least");
            setErrorModal(true);
            return;
        }

        const unixStartDate = Math.floor((new Date(starttime) - epoch) / 1000);
        const unixEndDate = Math.floor((new Date(endtime)- epoch) / 1000);

        const address = await createElectionContract(unixStartDate, unixEndDate);

        const form = {
            admin_id: user.id,
            title: title,
            start_time: starttime,
            end_time: endtime,
            address: address
        }
        
        try {
             await axios.post('election', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeModal();
            } catch (error) {
                setError(error.response.data.message);
                setErrorModal(true);
              console.log(error.response.data.message);
            }
        
    }

    useEffect(() => {
        if(title==='' || starttime==='' || endtime==='')
        setDisabled(true)
        else
        setDisabled(false)
      }, [title, starttime, endtime]);

    if(!open)
    return null;

return (
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
        <Button className='bg-cyan' onClick={createElection} disabled={disabled} >Create election</Button>
      </form>
    } />
   <SuccessModal open={errorModal} message={error} error={true} closeError={() => setErrorModal(false)} />
  </div> 
  );
}


export default CreateElection;
