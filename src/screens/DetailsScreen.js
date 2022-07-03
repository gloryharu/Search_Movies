import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';

const DetailsScreen = ({route}) => {
  const item = route.params.item;

  return (
    <ScrollView>
      <View>
        <Image
          style={{height: 250, marginVertical: 10}}
          resizeMode="contain"
          source={{
            uri:
              item.poster === null
                ? 'https://www.studytienganh.vn/upload/2021/05/98140.png'
                : 'https://image.tmdb.org/t/p/original/' + item.poster,
          }}
        />

        <View style={{marginHorizontal: 10}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              marginHorizontal: 30,
              padding: 10,
              borderRadius: 10,
              elevation: 1,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'orange',
              }}>
              {item.title}
            </Text>
            <Text style={{textAlign: 'center', color: 'orange'}}>
              Language: {item.language}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 5,
            }}>
            Description:
          </Text>
          <View
            style={{
              backgroundColor: '#000000aa',
              padding: 10,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 20,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              {item.overview === '' ? "Information not found" : item.overview}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
