import axios from "../../../api/axios";
import jwt_decode from "jwt-decode";
import { updateUser } from '../../../redux/user';

export const login = async (email, password, socket, dispatch, navigate) => {
    
    const form = {
        email: email,
        password: password
    };
    // Get the email from jwt
    try {
        const data = await axios.post('auth/login/user', form);
        const token = data.data;
        const decoded = jwt_decode(token);
        dispatch(updateUser({
          email: decoded.email
        }));
        localStorage.setItem('token', token);
        // Save the jwt then get the rest of the user data from email
        try {
          const user = await axios.get(`user/${decoded.email}`, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          // Add a new user email to socket.io users list
          socket.emit('login', decoded.email);
          dispatch(updateUser({
            firstName: user.data.data.first_name,
            lastName: user.data.data.last_name,
            id: user.data.data._id
          }));
          navigate('/main');
          return null;
        } catch (error) {
          console.log(error.response.data.message);
          return {
            error: true,
            message: error.response.data.message
        }
        }
    }
    catch (error) {
        console.log(error.response.data.message);
        return {
            error: true,
            message: error.response.data.message
        }
    }
  }