import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  loading: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: state => {
      return {...state, loading: true};
    },
    login_success: (state, action) => {
      return {...state, userInfo: action.payload.data, loading: false};
    },
    logout: state => {
      return {...state, userInfo: {}, loading: false};
    },
  },
});

export const {login, login_success,logout} = userSlice.actions;
export default userSlice.reducer;
