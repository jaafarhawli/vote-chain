import { createElectionContract } from "../../../Web3";
import axios from "../../../api/axios";

export const createElection = async (endtime, starttime, epoch, user_id, title, refetch, closeModal) => {
     
    if(((endtime - starttime)/36e5) < 24) {
        return {
            error: "Your election should be 24 hours at least",
            errorModal: true
        }
    }

    const unixStartDate = Math.floor((new Date(starttime) - epoch) / 1000);
    const unixEndDate = Math.floor((new Date(endtime)- epoch) / 1000);

    const address = await createElectionContract(unixStartDate, unixEndDate);

    const form = {
        admin_id: user_id,
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
          return null;
        } catch (error) {
          console.log(error.response.data.message);
          return {
              error: error.response.data.message,
              errorModal: true
          }
        }
    
}