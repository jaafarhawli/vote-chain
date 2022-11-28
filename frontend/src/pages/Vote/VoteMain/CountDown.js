import { viewElection } from "../../../redux/election";

export const countDown = (start , time, dispatch, setLive, setDisabled, clearInterval, setTimerDays, setTimerHours, setTimerMinutes, setTimerSeconds) => {
    const startDate = new Date(time).getTime();

    let interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = startDate - now;
      
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      const minutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor(distance % (60 * 1000) / 1000);

      // If the timer has ended
      if(distance<0) {
        // If election has just started, start a new counter that counts the time left for election to end
        if(start) {
          setLive(true);
          setDisabled(false);
          clearInterval(interval.current);
        }
        // If the election has ended, stop the timer
        else {
            dispatch(viewElection({
                ended: true
            }));
            clearInterval(interval.current);
        }
      }
      else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    })
  }