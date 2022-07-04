import {Alert} from 'react-native';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {API} from '../server/API';

//TOKEN của tài khoản movies
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTMzMGQ0YzUyZjVhZDI4OGE5YTdlOGZkZjI4ZGJlNCIsInN1YiI6IjYyYTc0ZjNlZWIxNGZhMDlkZTA1NDc3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xy1CVTzIZNID-yUThpZP9F3mO_-xx_efq3MDMDWZiPY';

function* loginSaga(action) {
  try {
    const response = yield call(API, {
      url: 'http://i-web.com.vn/api/v1/auth/signin',
      method: 'POST',
      isLogin: true,
      params: {
        client_data: {
          username: action.payload.username,
          password: action.payload.password,
        },
      },
    });
    yield put({type: 'user/login_success', payload: response});
  } catch (error) {
    console.log(error);
  }
}

function* getMoviesSaga() {
  const {home} = yield select();
  const searchText = home.searchText;
  if (!searchText) {
    yield put({type: 'home/search_error'});
    Alert.alert('Error', 'Please enter something to search', [
      {
        text: 'OK',
        onPress: () => console.log('OK1'),
        style: 'cancel',
      },
    ]);
  } else {
    try {
      const response = yield call(API, {
        url: `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false`,
        method: 'GET',
        token: TOKEN,
      });

      if (response.results.length === 0) {
        yield put({type: 'home/search_error'});
        Alert.alert('Error', 'Not Found', [
          {
            text: 'OK',
            onPress: () => console.log('OK2'),
            style: 'cancel',
          },
        ]);
      } else {
        yield put({type: 'home/search_success', payload: response});
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function* sagas() {
  yield takeEvery('user/login', loginSaga);
  yield takeEvery('home/search', getMoviesSaga);
}

export default sagas;
