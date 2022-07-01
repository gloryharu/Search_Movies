import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTMzMGQ0YzUyZjVhZDI4OGE5YTdlOGZkZjI4ZGJlNCIsInN1YiI6IjYyYTc0ZjNlZWIxNGZhMDlkZTA1NDc3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xy1CVTzIZNID-yUThpZP9F3mO_-xx_efq3MDMDWZiPY';

  useEffect(() => {
    getMovies();
  }, [searchText]);

  const getMovies = async () => {
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
          // body: JSON.stringify({}),
        },
      );

      const json = await response.json();
      // console.log(json.results);
      setData(json.results);
    } catch (error) {
      console.log(error);
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
          paddingHorizontal: 5,
        }}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Enter something to search"
        />
      </View>
      {/* <View style={{marginHorizontal: 10}}>
        <Button onPress={() => getMovies()} title="Search" />
      </View> */}

      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <View
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
                    'https://image.tmdb.org/t/p/original/' + item.poster_path,
                }}
              />
              <View>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  {item.original_title}
                </Text>
                <Text style={{fontSize: 12, fontStyle: 'italic', color: 'red'}}>
                  {item.vote_average} stars
                </Text>
                <Text style={{fontSize: 12, fontStyle: 'italic'}}>
                  {item.release_date}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
