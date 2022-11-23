import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const Loader = ({loading}) => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <HashLoader
        color={'#6B81FF'}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
