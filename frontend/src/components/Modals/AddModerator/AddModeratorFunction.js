import axios from "../../../api/axios";

export const addModerator = async (email, election_id, user_id, user_email, election_title,socket, refetch, closeModal) => {

    const form = {
        email: email,
        election_id: election_id,
        sender_email: localStorage.email,
        user_id: user_id
    }
    
    try {
         await axios.post('moderator', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          socket.emit('sendNotification', user_email, election_title, email);
          refetch();
          closeModal();
          return null;
        } catch (error) {
            console.log(error);
            return {
                error: true,
                isError: true,
                setErrorModal: true
            }
        }  
}