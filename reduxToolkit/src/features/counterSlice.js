import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementby5: (state) => {
            state.count += 5
        },
    }
})
export default counterSlice.reducer
export const { increment,decrement,incrementby5 } = counterSlice.actions
