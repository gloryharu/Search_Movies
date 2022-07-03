import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listMovies: [],
  loading: null,
  searchText: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    inputText: (state, action) => {
      if (!action.payload) {
        return {...state, listMovies: [], loading: false, searchText: ''};
      }
      return {...state, loading: false, searchText: action.payload};
    },
    clear_inputText: state => {
      return {...state, searchText: ''};
    },
    search: state => {
      return {...state, loading: true};
    },
    search_success: (state, action) => {
      return {...state, listMovies: action.payload.results, loading: false};
    },
    search_error: state => {
      return {...state, loading: false};
    },
    reset_homeState : (state) =>{
        return {...state,listMovies: [],searchText: ''}
    },
  },
});

export const {
  inputText,
  clear_inputText,
  search,
  search_success,
  search_error,
  reset_homeState
} = homeSlice.actions;
export default homeSlice.reducer;
