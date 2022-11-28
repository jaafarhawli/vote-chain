import axios from "../../../api/axios";
import { changeTimeInterval } from "../../../Web3";
import { viewElection } from "../../../redux/election";

export const changeTime = async (starttime, endtime, election_id, user_id, election_address, dispatch, setError, setMessage, setSuccessModal, setSave, save) => {
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
    await changeTimeInterval(unixStartDate, unixEndDate, election_address);
    const form = {
      start_time: starttime,
      end_time: endtime,
      user_id: user_id,
      election_id: election_id,
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