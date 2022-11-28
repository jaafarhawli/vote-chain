import axios from "../../../api/axios";
import { updateUser } from "../../../redux/user";

export const saveInfo = async(user_id, firstname, lastname, email, dispatch, setSave, save, setMessage, setIsError, setSuccessModal) => {
    const form = {
        id: user_id,
        first_name: firstname,
        last_name: lastname,
        email: email,
    }
    try {
      await axios.put('user/account', form, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      dispatch(updateUser({
        firstName: firstname,
        lastName: lastname,
        email: email
      }));
      setSave(!save);
      setIsError(false);
      setMessage('Account updated successfully');
      setSuccessModal(true);
    } catch (error) {
      console.log(error.response.data.message);
      setSave(!save);
      setIsError(true);
      setMessage(error.response.data.message);
      setSuccessModal(true);
    }
}