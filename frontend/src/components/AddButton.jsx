import React from 'react';
import {FaRegPlusSquare} from 'react-icons/fa';

const AddButton = (props) => {
  return (
    <div>
      <button>{props.text} <FaRegPlusSquare className='text-[18px]' /></button>
    </div>
  );
}

export default AddButton;
