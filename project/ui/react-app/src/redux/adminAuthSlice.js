import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAdmin = createAsyncThunk('admin/login',async(loginData,thunkAPI) =>{
    try{
        const response = await fetch('http://localhost:4000/admin/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(loginData)
        })
        if (!response.ok) {
            throw new Error('Failed to login');
          }
          const data = await response.json();  
          Cookies.set('token',data.token);
          console.log('ADMIN VALID');
          return data;
      
        } catch (error) {
          throw error;
        }
      }
      );

      const initialState = {
        msg: '',
        admin: null,
        loading: false,
        error: null,
      }

      const AdminSlice = createSlice({
        name: 'admin',
        initialState,
        reducers: {
            clearAdmin: (state) => {
              state.admin = null;
            }
          },          
        extraReducers: (builder) => {
          builder
            .addCase(loginAdmin.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
              console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
              console.log(action);
              state.loading = false;
              state.msg = action.payload.msg;
              state.admin = action.payload.payload.name;
              console.log('INSIDE',state.admin);
              window.location.href = '/admin/home'
      
            })
            .addCase(loginAdmin.rejected, (state, action) => { 
              state.loading = false;
              state.error = action.error.message;
            });
        },
      });

      export default AdminSlice.reducer;
      export const {clearAdmin} = AdminSlice.actions