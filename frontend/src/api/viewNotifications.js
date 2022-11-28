import axios from "./axios";

export const viewNotifications = async (user_id) => {
    return axios.get(`user/notifications/${user_id}`, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      }).then((res) => res.data.data);
}