import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, thunkAPI) => {
    console.log('USERDATA',userData);
    try {
      const response = await fetch('http://localhost:4000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      const data = await response.json();
      console.log(data);
      window.location.href = '/home'
    } catch (error) {
      throw error;
    }
  }
);


export const loginUser = createAsyncThunk('user/loginUser',async(loginData,thunkAPI) => {
console.log('LOGIN CALLED');
  try{
    const response = await fetch('http://localhost:4000/user/login',{
    method:'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(loginData)
    });

    if(!response.ok)
    {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    console.log('DATA-------',data);

    console.log('TOKEN-------',data.token);
    Cookies.set('token',data.token);
     console.log(Cookies);
    return data;

  } catch (error) {
    throw error;
  }
}
);

const initialState = {
  msg: '',
  user: null,
  loading: false,
  error: null,
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
      clearUser:(state)=>{
        state.userObj = null;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
        console.log(action);
        state.loading = false;
        state.msg = action.payload.msg;
        state.user = action.payload.payload.name;
        console.log('INSIDE',state.user);
        window.location.href = '/home'
      })
      .addCase(loginUser.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export default UserSlice.reducer;
export const {clearUser} = UserSlice.actions
