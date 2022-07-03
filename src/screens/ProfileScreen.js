import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {login, login_success, logout} from '../redux_toolkit/slices/userSlice';
import { reset_homeState } from '../redux_toolkit/slices/homeSlice';

const ProfileScreen = () => {
  const user = useSelector(state => state.user);
  const userInfo = user.userInfo;
  const loading = user.loading;

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    dispatch(login());
    try {
      const response = await fetch('http://i-web.com.vn/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_data: {
            username: username,
            password: password,
          },
        }),
      });
      const json = await response.json();
      // console.log('LOGIN: ', json?.data);
      dispatch(login_success(json));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {userInfo?.accessToken ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>Username: {userInfo.username}</Text>
              <Button
                onPress={() => {
                  dispatch(logout());
                  dispatch(reset_homeState())
                }}
                title="Logout"
              />
            </View>
          ) : (
            <>
              <View style={styles.inputStyle}>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                />
              </View>
              <View style={styles.inputStyle}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                />
              </View>
              <View style={{margin: 10}}>
                <Button
                  onPress={() =>
                    userLogin({username: username, password: password})
                  }
                  title="Login"
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 3,
  },
});
