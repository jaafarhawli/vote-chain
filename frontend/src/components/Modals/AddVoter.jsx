import React from 'react';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import FormInput from '../Reusable/FormInput';
import {HiOutlineXMark} from 'react-icons/hi2';

const AddVoter = () => {

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);

  return (
    <div className='bg-black-100/50 fixed w-full h-full z-10 '>
        <SuccessModal open={errorModal} message={error} error={true} closeSuccess={() => setErrorModal(false)} />
     <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
         <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
         <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Voter</h1>  
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" onChange={e => setName(e.target.value)}>Voter Name</FormInput>
          <Button className='bg-cyan' onClick={addVoter} disabled={disabled} >Add</Button>
      </form> 
     </div>
    </div>
  );
}

export default AddVoter;
