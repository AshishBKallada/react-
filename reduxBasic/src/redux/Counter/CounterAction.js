import { DECREMENT, INCREMENT, INCREMENTBY5 } from "./CounterTypes"

export const increment =()=>{
    return{
        type:INCREMENT
    }
}
export const decrement =()=>{
    return{
        type:DECREMENT
    }
}
export const incrementby5 =()=>{
    return{
        type:INCREMENTBY5,
        payload:5
    }
}