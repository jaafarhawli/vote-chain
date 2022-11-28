import axios from "../../../api/axios";

export const register = async (confirm, password, firstname, lastname, email) => {
    if(confirm!==password) {
        return {
            message: 'Passwords didnt match',
            error: true
        }
    }
    if(password.length<8) {
        return {
            message: 'Password should be 8 characters atleast',
            error: true
        }
    }
    const form = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    }
    try {
      const signup = await axios.post('email', form);
      return {
          message: signup.data,
          error: false
      }
    } catch (error) {
      console.log(error);
      return {
          message: error.data,
          error: true
      }
    }
}