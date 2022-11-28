import React, {useState, useRef} from 'react';
import {Button, FormLabelInput, Modal} from '../../Reusable';
import SuccessModal from '../SuccessModal/SuccessModal';
import {IoMdImage} from 'react-icons/io';
import { useSelector } from 'react-redux';
import { addCandidate } from './addCandidateFunction';

const AddCandidate = ({open, closeModal}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [name, setName] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState();
    const [isError, setIsError] = useState(true);
    const imageRef = useRef(null);
    
    const handleButtonClick = async () => {
      const res = await addCandidate(name, election.id, user.id, image);
      setError(res.error);
      setIsError(res.isError);
      setErrorModal(res.errorModal)
    } 

    const handleClick = () => {
        imageRef.current.click();
      };

    return (
      <>
      {open ?
      <div>
        <Modal title={'Add Candidate To Party'} closeModal={closeModal} content={
          <form className='w-4/5 flex flex-col gap-5 '>
              <input type="file" onChange={e => setImage(e.target.files[0])} className='hidden' ref={imageRef} />
              <IoMdImage className='self-center text-[100px] bg-black-100/20 text-white p-4 rounded-full hover:bg-black-100/30 duration-150' onClick={handleClick} />
              <FormLabelInput type="text" onChange={e => setName(e.target.value)}>Candidate Name</FormLabelInput>
              <Button className='bg-cyan' onClick={handleButtonClick}>Add</Button>
          </form> 
        } />
        <SuccessModal open={errorModal} message={error} error={isError} closeSuccess={() => setErrorModal(false)} />
      </div>
      :
      null}
      </>
    );
}

export default AddCandidate;
