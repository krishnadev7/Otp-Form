import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef({});
  const [otp, setOtp] = useState({
    digitOne: '',
    digitTwo: '',
    digitThree: '',
    digitFour: '',
    digitFive: '',
    digitSix: '',
  });

  useEffect(() => {
    inputRef.current[0].focus();
  },[])

  const handleChange = (e, index) => {
    const { name, value } = event.target;
    if(/[a-z]/gi.test(value)) return;
    setOtp(prev => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) inputRef.current[index + 1].focus();
  };

  const handleBackSpace = (e, index) => {
    if (e.key == 'Backspace') {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        key={index}
        ref={element => (inputRef.current[index] = element)}
        className='w-16 h-12 rounded-md text-center mr-3 text-xl'
        value={otp[keys]}
        name={keys}
        onChange={e => handleChange(e, index)}
        onKeyUp={e => handleBackSpace(e, index)}
      />
    ));
  };

  return (
    <form action=''>
      <h3 className='text-3xl mb-8'>Please fill in the form</h3>
      <div>{renderInput()}</div>
      <button className='mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]'>
        Submit
      </button>
    </form>
  );
}

export default App;
