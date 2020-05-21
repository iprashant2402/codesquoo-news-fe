import * as React from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';

export default function NewsScreen({navigation, route}) {
  const [stack, setStack] = React.useState([]);
  const [selectedPost, setPost] = React.useState({});
  var swiper = React.useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      const thisRef = this;
      console.log('HELLO');
      var {post} = route.params;
      post = JSON.parse(post);
      console.log(post);
      setPost(post);
      fetch('http://192.168.225.51:80/getSimilarNews?q=' + post.index)
        .then(res => res.json())
        .then(function(resJson) {
          console.log(resJson);
          setStack(resJson);
        })
        .catch(err => console.log(err));
      return () => {};
    }, []),
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Swiper
        ref={el => {
            swiper = el;
        }}
        cards={stack}
        renderCard={card => {
          console.log('INSIDE RENDER');
          console.log(card);
          return (
            <View style={styles.card}>
            <View style={styles.cardImage}>
              <Image source={{ uri: stack.length > 0 && card && card.urlToImage != undefined
                  ? card.urlToImage
                  : null }} style={styles.image}/>
            </View>
            <View style={styles.cardContainer}>
            <Text style={styles.h6}>{stack.length > 0 && card && card.title != undefined
                  ? card.title
                  : null}</Text>
            <Text style={[styles.p, styles.italic]}>
            {stack.length > 0 && card && card.description != undefined
                  ? card.description
                  : null}
            </Text>
            <Text style={styles.p}>
            {stack.length > 0 && card && card.content != undefined
                  ? card.content
                  : null}
            </Text>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.btn} title="View" onPress={()=>{
                navigation.navigate('NewsDetail', {
                 url: card.url 
                })
              }}><Text style={styles.btnText}>Read More</Text></TouchableOpacity>
            </View>
          </View>
          );
        }}
        onSwiped={cardIndex => {
          if (cardIndex == 9) {
            swiper.jumpToCardIndex(0);
            fetch(
              'http://192.168.225.51:80/getSimilarNews?q=' +
                stack[stack.length - 1].index,
            )
              .then(res => res.json())
              .then(function(resJson) {
                setStack(resJson);
              })
              .catch(err => console.log(err));
          }
        }}
        onSwipedAll={() => {}}
        cardIndex={0}
        backgroundColor={'#f6f6f6'}
        horizontalSwipe={false}
        infinite={true}
        goBackToPreviousCardOnSwipeBottom={true}
        stackSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 22
  },
  image:{
    width: '100%',
    height: 200
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5
  },
  italic:{
      fontStyle: 'italic'
  },
  h6: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5
  },
  p: {
    fontWeight: '100',
    fontSize: 14,
    marginVertical: 5
  },
  cardContainer:{
    padding: 16
  },
  cardFooter:{
    padding: 0,
    paddingHorizontal: 16
  },
  btn:{
    height: 40,
    width: '50%',
    backgroundColor: '#336699',
    color: '#fff',
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
//   card:{
//     //elevation: 1,
//     borderLeftColor: '#336699',
//     borderLeftWidth: 5,
//     marginVertical: 16,
//     borderRadius: 0
//   }
});
