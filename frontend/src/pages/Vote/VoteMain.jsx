import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import curve from '../../assets/backgroundcurve.svg';
import Button from '../../components/Reusable/Button';
import LandingFooter from '../Landing/LandingFooter';
import Timer from '../../components/Reusable/Timer';
import { useSelector, useDispatch } from 'react-redux';
import { viewElection } from '../../redux/election';

const VoteMain = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const election = useSelector((state) => state.election.value);
  const voter = useSelector((state) => state.voter.value);

  
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [live, setLive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const startEndTimer = () => {
    const endDate = new Date(election.endTime).getTime();
  
    let interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = endDate - now;
      
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      const minutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor(distance % (60 * 1000) / 1000);
  
      if(distance<0) {    
          dispatch(viewElection({
            ended: true
          }));
          clearInterval(interval.current);
        }
        
      else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    })
  }

  const startTimer = () => {
    const startDate = new Date(election.startTime).getTime();

    let interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = startDate - now;
      
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      const minutes = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor(distance % (60 * 1000) / 1000);

      if(distance<0) {
          setLive(true);
          setDisabled(false);
          clearInterval(interval.current);
      }
      else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    })
  }

  const checkResults = () => {
    navigate('results');
  }

  useEffect(() => {
    if(live)
    startEndTimer();
    else
    startTimer();
  });


  return (
    <>
    <div className='hero flex flex-col bg-no-repeat bg-center bg-cover bg-bg w-full h-screen' >
      <div className='flex w-full pt-4 items-center justify-between lg:px-28 md:px-10 px-4'>
        <img src={logo} alt="logo" className='w-48' />
      </div>
      <div className='flex h-full flex-1 lg:pl-28 md:pl-10 pl-4 sm:justify-between justify-center'>
        <div className='flex flex-col justify-center sm:items-start items-center text-center sm:text-left'>
            <h1 className='text-4xl text-white font-bold md:text-5xl lg:text-6xl pt-12 md:pt-8'>{election.title}</h1>
            <p className='text-white pt-6 max-w-[400px]'>{election.description}</p>
            <div className='flex gap-4 mt-6'>
                <Button onClick={() => navigate('select')} disabled={disabled || voter.voted} >Vote now</Button>              
                <Button className={'border-cyan border-2 bg-opacity-0 hover:bg-cyan disabled:hover:bg-black-200 disabled:border-none'} disabled={disabled || !election.ended} onClick={checkResults} >Check Results</Button>
            </div> 
        </div>
      </div>
      <img src={curve} alt='/' className='w-full invisible max-h-[110px]' />
    </div>
    <div className='flex flex-col justify-center items-center w-full h-[300px] bg-bg'>
        {election.ended ?
        <h1 className='text-[34px] font-bold mb-8 text-white'>Election has ended</h1>
        :
        live ?
        <>
        <h1 className='text-[34px] font-bold mb-8 text-white'>Time Left For Election To End</h1>
        <div className='flex gap-8'>
            <Timer type={"Days"}>{timerDays}</Timer>
            <Timer type={"Hours"}>{timerHours}</Timer>
            <Timer type={"Minutes"}>{timerMinutes}</Timer>
            <Timer type={"Seconds"}>{timerSeconds}</Timer>
        </div>
        </>
        :
        <>
        <h1 className='text-[34px] font-bold mb-8 text-white'>Time Left For Election</h1>
        <div className='flex gap-8'>
            <Timer type={"Days"}>{timerDays}</Timer>
            <Timer type={"Hours"}>{timerHours}</Timer>
            <Timer type={"Minutes"}>{timerMinutes}</Timer>
            <Timer type={"Seconds"}>{timerSeconds}</Timer>
        </div>
        </>}
    </div>
    <LandingFooter />
    </>
  );
}

export default VoteMain;