import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  inputText,
  search,
  search_success,
  search_error,
  clear_inputText,
} from '../redux_toolkit/slices/homeSlice';

const HomeScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const userInfo = user.userInfo;
  const home = useSelector(state => state.home);
  const listMovies = home.listMovies;
  const loading = home.loading;
  const searchText = home.searchText;
  const dispatch = useDispatch();

  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTMzMGQ0YzUyZjVhZDI4OGE5YTdlOGZkZjI4ZGJlNCIsInN1YiI6IjYyYTc0ZjNlZWIxNGZhMDlkZTA1NDc3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xy1CVTzIZNID-yUThpZP9F3mO_-xx_efq3MDMDWZiPY';

  const getMovies = async () => {
    dispatch(search());
    if (searchText === '') {
      Alert.alert('Error', 'Please enter something to search', [
        {
          text: 'OK',
          onPress: () => console.log('Đã ấn OK'),
          style: 'cancel',
        },
      ]);
      dispatch(search_error());
    } else {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + TOKEN,
            },
          },
        );
        const json = await response.json();
        // console.log("RESULTS: ",json.results);
        if (json.results.length === 0) {
          Alert.alert('Error', 'Not Found', [
            {
              text: 'OK',
              onPress: () => console.log('Đã ấn OK'),
              style: 'cancel',
            },
          ]);
        }
        dispatch(search_success(json));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          marginVertical: 10,
          elevation: 3,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          style={{flex: 1}}
          value={searchText}
          onChangeText={text => dispatch(inputText(text))}
          placeholder="Enter something to search"
          autoCorrect={false}
          autoCapitalize="none"
          editable={userInfo?.accessToken ? true : false}
        />

        {searchText.length > 0 ? (
          <Ionicons
            onPress={() => dispatch(clear_inputText())}
            name="ios-close-circle"
            size={20}
          />
        ) : null}
      </View>
      <View style={{marginHorizontal: 10}}>
        <Button
          disabled={userInfo?.accessToken ? false : true}
          onPress={() => {
            getMovies();
            Keyboard.dismiss();
          }}
          title="Search"
        />
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        {userInfo?.accessToken ? null : (
          <Text style={{textAlign: 'center', fontStyle: 'italic',marginTop: 5}}>
            (Vui lòng đăng nhập để dùng chức năng SEARCH)
          </Text>
        )}
      </View>
      <>
        {loading ? (
          <ActivityIndicator size="large" style={{flex: 1}} />
        ) : (
          <FlatList
            data={listMovies}
            refreshing={false}
            onRefresh={getMovies}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailsScreen', {
                      title: item?.original_title,
                      item: {
                        title: item?.original_title,
                        language: item?.original_language,
                        overview: item?.overview,
                        poster: item?.poster_path,
                      },
                    });
                  }}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={{height: 50, width: 50, marginRight: 10}}
                    source={{
                      uri:
                        item.poster_path === null
                          ? 'https://www.studytienganh.vn/upload/2021/05/98140.png'
                          : 'https://image.tmdb.org/t/p/original/' +
                            item.poster_path,
                    }}
                  />
                  <View>
                    <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                      {item?.original_title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: 'red',
                      }}>
                      {item?.vote_average} stars
                    </Text>
                    <Text style={{fontSize: 12, fontStyle: 'italic'}}>
                      {item?.release_date}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
