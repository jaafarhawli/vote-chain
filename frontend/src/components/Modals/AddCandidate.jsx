import React, {useState, useRef} from 'react';
import axios from '../../api/axios';
import Button from '../Reusable/Button';
import SuccessModal from './SuccessModal';
import {IoMdImage} from 'react-icons/io';
import { useSelector } from 'react-redux';
import FormLabelInput from '../Reusable/FormLabelInput';
import Modal from './Modal';

const AddCandidate = ({open, closeModal}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState();
    const [isError, setIsError] = useState(true);
    const imageRef = useRef(null);
    
    const addCandidate = async () => {

        const form = {
            name: name,
            party_id: localStorage.party_id,
            election_id: election.id,
            user_id: user.id
        }
        
        try {
             const data = await axios.post('candidate/', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });

              localStorage.setItem('candidate_id', data.data.data._id);
              if(image) {
                const formData = new FormData();

                formData.append('candidate_id',localStorage.candidate_id);
                formData.append('party_id', localStorage.party_id);
                formData.append('candidateImg',image, image.name);

                try {
                    await axios.post('candidate/image', formData, {
                       headers: {
                         Authorization: `bearer ${localStorage.token}`
                       }
                     });
      
                   } catch (error) {
                       setError(error.resoonse.data.message);
                       setIsError(true);
                       setErrorModal(true);
                     console.log(error.resoonse.data.message);
                   }
              }
              setIsError(false);
              setError("Candidate added");
              setErrorModal(true);
            } catch (error) {
                setError(error.resoonse.data.message);
                setIsError(true);
                setErrorModal(true);
              console.log(error.resoonse.data.message);
            }
        
    }


    const handleClick = event => {
        imageRef.current.click();
      };

  
      if(!open)
      return null;

    return (
      <div>
        <Modal title={'Add Candidate To Party'} closeModal={closeModal} content={
          <form className='w-4/5 flex flex-col gap-5 '>
              <input type="file" onChange={e => setImage(e.target.files[0])} className='hidden' ref={imageRef} />
              <IoMdImage className='self-center text-[100px] bg-black-100/20 text-white p-4 rounded-full hover:bg-black-100/30 duration-150' onClick={handleClick} />
              <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Candidate Name</FormLabelInput>
              <Button className='bg-cyan' onClick={addCandidate}>Add</Button>
          </form> 
        } />
        <SuccessModal open={errorModal} message={error} error={isError} closeSuccess={() => setErrorModal(false)} />
      </div>
    );
}

export default AddCandidate;
