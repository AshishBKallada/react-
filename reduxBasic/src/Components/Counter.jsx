import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementby5 } from '../redux/Counter/CounterAction'; 

function Counter() {
    const count = useSelector(state => state.count);
    const count2 = useSelector(state => state.count2);

    const dispatch = useDispatch();
  
    return (
        <div>
            Count : {count}
            &nbsp; &nbsp;
            <button onClick={() => dispatch(increment())}>Inc Btn</button> &nbsp; &nbsp;
            <button onClick={() => dispatch(decrement())}>Dec Btn</button>
            <br /><br />
            Count2 : {count2}
            &nbsp; &nbsp;
            <button onClick={() => dispatch(incrementby5())}>Inc Btn</button> 

 
        </div>
    );
}

export default Counter;
