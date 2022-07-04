import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  account: {},
  loading: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {...state, loading: true, account: action.payload};
    },
    login_success: (state, action) => {
      return {...state, loading: false, userInfo: action.payload.data};
    },
    logout: state => {
      return {...state, userInfo: {}, account: {}, loading: false};
    },
  },
});

export const {login, login_success, logout} = userSlice.actions;
export default userSlice.reducer;
