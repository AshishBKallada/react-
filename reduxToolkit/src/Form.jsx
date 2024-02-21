import React, { useState } from 'react';
import { submit } from './features/formSlice';
import { useDispatch } from 'react-redux';

function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(submit({ name, age }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        placeholder='Enter name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        name='age'
        placeholder='Enter age'
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Form;
