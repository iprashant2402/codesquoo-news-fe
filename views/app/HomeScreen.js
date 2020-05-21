import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, RefreshControl, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';


export default function HomeScreen({navigation}) {
  const [newsList, setNewsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetch('http://192.168.225.51:80/initialNewsStack', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(function(resJson) {
          setNewsList(resJson);
          setRefreshing(false);
        })
        .catch(err => {
          console.error(err);
          setRefreshing(false);
        });
    
  }, [refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('INSIDE CALLBACK HOMESCREEN');
      const thisRef = this;
      fetch('http://192.168.225.51:80/initialNewsStack', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(function(resJson) {
          console.log('INSIDE FETCH THEN HOMESCREEN');
          setNewsList(resJson);
        })
        .catch(err => {
          console.log('INSIDE FETCH CATCH HOMESCREEN');
          console.error(err);
        });
      return () => {};
    }, []),
  );

  var listItem = newsList.map((l, i) => (
    <TouchableOpacity
      key={i}
      style={styles.card}
      title="View"
      onPress={() => {
        navigation.navigate('News', {
          post: JSON.stringify(l),
        });
      }}>
      <View>
        <View style={styles.cardImage}>
          <Image source={{uri: l.urlToImage}} style={styles.image} />
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.h6}>{l.title}</Text>
        </View>
        <View style={styles.cardFooter} />
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.padded}>
        <Text style={styles.h1}>Latest Stories</Text>
        </View>
      {listItem}
    </ScrollView>
  );
  a;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  padded:{
    padding: 22
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
  },
  h6: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  cardContainer: {
    padding: 16,
  },
  cardFooter: {
    padding: 0,
    paddingHorizontal: 16,
  },
  btn: {
    height: 40,
    width: '50%',
    backgroundColor: '#336699',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    //elevation: 1,
    borderLeftColor: '#336699',
    borderLeftWidth: 0,
    marginVertical: 16,
    borderRadius: 0,
  },
});
