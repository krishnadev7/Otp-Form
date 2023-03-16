import { useState } from 'react';
import './App.css';

function App() {
  const renderInput = () => {
    return <input className='w-16 h-12 rounded-md text-center mr-3 text-xl' />;
  };

  return (
    <form action=''>
      <h3 className='text-3xl mb-8'>Please fill in the form</h3>
      <div>
        {renderInput()}
        {renderInput()}
        {renderInput()}
        {renderInput()}
        {renderInput()}
        {renderInput()}
      </div>
      <button className='mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]'>
        Submit
      </button>
    </form>
  );
}

export default App;
