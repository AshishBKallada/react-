import { createStore } from "redux"; 
import countReducer from "./Counter/CounterReducer";

const store = createStore(countReducer);

export default store;
