import React from 'react';
import {FaRegPlusSquare} from 'react-icons/fa';

const AddButton = (props) => {
  return (
    <div>
      <button className={`button ${props.class}`} onClick={props.click}>
          <div className='flex items-center gap-1 justify-center'>
              {props.text} <FaRegPlusSquare className='text-[18px]' />          
          </div>
          </button>
    </div>
  );
}

export default AddButton;
