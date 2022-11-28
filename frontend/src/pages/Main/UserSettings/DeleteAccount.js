import axios from "../../../api/axios";

export const deleteAccount = async (user_id, navigate) => {
    const form = {
        id: user_id
    } 
    try {
        await axios.post('user/account', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          localStorage.clear(); 
          document.body.style.overflow = 'unset';
          navigate('/');
        } catch (error) {
          console.log(error.response.data.message);
        }
    }