import axios from "../../../api/axios";

// Reject the request sent by another user to be added to his election as a moderator
export const rejectRequest = async (election_id, user_id, refetchNotifications, refetch) => {
    const form = {
      user_id: user_id,
      election_id: election_id
   }   
    try {
         await axios.post('user/notifications/reject', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          refetchNotifications();
          refetch();
        } catch (error) {
          console.log(error);
        }  
  }