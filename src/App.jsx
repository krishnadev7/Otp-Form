import { useEffect, useRef, useState } from 'react';
import { Formik, useFormik } from 'formik';
import './App.css';

const validate = (values) => {
  const errors = {}
  if (values.otp.some(data => data === '')) {
    errors.otp = 'This field is required';
  }
  return errors;
}

function App() {
  const formik = useFormik({
    initialValues: {
      otp: Array.from({length: 6}).fill("")
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  // console.log(formik.values);

  const inputRef = useRef({});

  // const [otp, setOtp] = useState({
  //   digitOne: '',
  //   digitTwo: '',
  //   digitThree: '',
  //   digitFour: '',
  //   digitFive: '',
  //   digitSix: '',
  // });

  useEffect(() => {
    inputRef.current[0].focus();

    inputRef.current[0].addEventListener('paste', pasteText);

    return () => inputRef.current[0].removeEventListener('paste', pasteText);
  }, []);

  function pasteText(e) {
    const pastedText = e.clipboardData.getData('text');
    const fieldValue = {};
    Object.keys(otp).forEach((key, index) => {
      fieldValue[key] = pastedText[index];
    });
    setOtp(fieldValue);
    inputRef.current[5].focus();
  }

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/[a-z]/gi.test(value)) return;

    const currentOtp = [...formik.values.otp]
    currentOtp[index] = value.slice(-1);

    formik.setValues((prev) => ({
      ...prev,
      otp: currentOtp
    }))

    // setOtp(prev => ({
    //   ...prev,
    //   [name]: value.slice(-1),
    // }));

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
    return formik.values.otp.map((values, index) => (
      <input
        key={index}
        ref={element => (inputRef.current[index] = element)}
        className='w-16 h-12 rounded-md text-center mr-3 text-xl'
        value={values}
        name={index}
        onChange={e => handleChange(e, index)}
        onKeyUp={e => handleBackSpace(e, index)}
      />
    ));
  };

  return (
    <form action=''>
      <h3 className='text-3xl mb-8'>Please fill in the form</h3>
      <Formik>
        <div>{renderInput()}</div>
      </Formik>
      {formik.errors.otp && <p>Please fill the fields</p>}
      <button type='button' className='mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]'
        onClick={formik.handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default App;
