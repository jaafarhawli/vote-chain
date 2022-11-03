import React, {useState, useRef} from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';
import axios from '../../api/axios';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../Reusable/Button';
import FormInput from '../Reusable/FormInput';
import SuccessModal from './SuccessModal';
import {IoMdImage} from 'react-icons/io'

const AddCandidate = ({open, closeModal}) => {

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState();
    const imageRef = useRef(null);
    
    const addCandidate = async () => {

        const form = {
            name: name,
            party_id: localStorage.party_id
        }
        
        try {
             const data = await axios.post('user/candidate', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              localStorage.setItem('candidate_id', data.data._id)
              closeModal();
            } catch (error) {
                setError(error.message);
                setErrorModal(true);
              console.log(error);
            }
        
    }

    const uploadImage = async () => {
        const formData = new FormData();

        formData.append('candidate_id',localStorage.candidate_id);
        formData.append('party_id', localStorage.party_id);
        formData.append('candidateImg',image, image.name);
        
        try {
            const data = await axios.post('user/image', formData, {
               headers: {
                 Authorization: `bearer ${localStorage.token}`
               }
             });
             console.log(data);
           } catch (error) {
               setError(error.message);
               setErrorModal(true);
             console.log(error);
           }
    }

    const handleClick = event => {
        imageRef.current.click();
        setImage(event.current.files[0]);
      };

  
      if(!open)
      return null;
  
    return (
      <div className='bg-black-100/50 fixed w-full h-full z-10 '>
          <SuccessModal open={errorModal} message={error} error={true} closeError={() => setErrorModal(false)} />
       <div className=' fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-2/3 w-4/5 max-w-[500px] flex flex-col bg-white shadow-xl items-center z-10 rounded-lg px-8 py-14 '>
           <HiOutlineXMark className='fixed top-2 left-2 text-[30px] hover:bg-black-100/20 rounded-full duration-200 p-1' onClick={closeModal} />
           <img src={logo} alt="logo" className='w-[180px]' />
        <div className='bg-black-100 h-[2px] w-[180px]'></div>  
        <h1 className='my-4 text-2xl font-semibold text-purple-100'>Add Candidate To Party</h1>  
        <form className='w-4/5 flex flex-col gap-5 '>
            <input type="file" onChange={e => setImage(e.target.files[0])} className='hidden' ref={imageRef} />
            <IoMdImage className='self-center text-[100px] bg-black-100/20 text-white p-4 rounded-full hover:bg-black-100/30 duration-150' onClick={handleClick} />
            <FormInput type="text" onChange={e => setName(e.target.value)}>Candidate Name</FormInput>
            <Button className='bg-cyan' onClick={addCandidate}>Add</Button>
        </form> 
       </div>
      </div>
    );
}

export default AddCandidate;
