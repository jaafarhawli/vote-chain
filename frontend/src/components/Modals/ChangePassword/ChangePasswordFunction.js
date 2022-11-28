import axios from "../../../api/axios";

export const changePassword = async(confirm, password, user_id, oldPassword) => {
    if(confirm!==password) {
        return {
            message: 'Passwords didnt match',
            isError: true,
            successModal: true
        }
    }
    const form = {
        id: user_id,
        old_password: oldPassword,
        password: password,
    }
    try {
      await axios.put('user/password', form, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      });
      return {
        message: 'Password updated successfully',
        isError: false,
        successModal: true
        }
    } catch (error) {
      console.log(error.response.data.message);
      return {
        message: error.response.data.message,
        isError: true,
        successModal: true
        }
    }
}