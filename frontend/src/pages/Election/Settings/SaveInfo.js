import axios from "../../../api/axios";
import {viewElection} from '../../../redux/election';

export const saveInfo = async(election_id, user_id, title, description, dispatch, setError, setMessage, setSuccessModal, setSave, save) => {
    const form = {
        election_id: election_id,
        user_id: user_id,
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