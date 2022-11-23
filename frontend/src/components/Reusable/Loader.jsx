import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = ({loading}) => {
  return (
    <div className='flex w-full h-full justify-center items-center mt-12'>
      <PropagateLoader
        color={'#6B81FF'}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
