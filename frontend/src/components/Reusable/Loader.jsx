import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = ({loading, admin}) => {
  return (
    <>
    {admin ? 
    <div className='flex pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen justify-center items-center'>
      <PropagateLoader
        color={'#6B81FF'}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    :
    <div className='flex w-full h- flex-1 justify-center items-center'>
      <PropagateLoader
        color={'#6B81FF'}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    }
    </>
  );
}

export default Loader;
