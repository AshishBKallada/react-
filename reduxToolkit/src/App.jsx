import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementby5 } from './features/counterSlice';
import Form from './Form';
function App() {
  const { count } = useSelector(state => state.counter);
  const {name,age} = useSelector(state => state.form);
  const dispatch = useDispatch();

  return (
    <div style={{'marginLeft':'500px'}}>
      Count: {count}
      <button onClick={() => dispatch(increment())}>Inc Btn</button>
      <button onClick={() => dispatch(decrement())}>Dec Btn</button>
      <button onClick={() => dispatch(incrementby5())}>Inc Btn</button>
      <Form />
      <h1>name:{name}</h1>
      <h1>age:{age}</h1>

    </div>
  );
}

export default App;
