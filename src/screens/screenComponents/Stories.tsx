// latest stories

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ScrollView, Image} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Stories() {
  const navigation = useNavigation();
  const storyInfo = [
    {id: 1, name: 'Your Story', image: require('../storage/images/58916.jpg')},
    {id: 2, name: 'John', image: require('../storage/images/sunset.jpg')},
    {id: 3, name: 'Mia', image: require('../storage/images/person1.jpg')},
    {id: 4, name: 'Khalifa', image: require('../storage/images/person2.jpg')},
    {id: 5, name: 'Sunny', image: require('../storage/images/person3.jpg')},
    {id: 6, name: 'Leone', image: require('../storage/images/person4.jpg')},
    {id: 7, name: 'Johhny', image: require('../storage/images/person5.jpg')},
    {id: 8, name: 'Sins', image: require('../storage/images/person6.jpg')},
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingVertical: 20}}>
      {storyInfo.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('Status', {
                name: data.name,
                image: data.image,
                storyInfo,
                index,
              })
            }>
            <View style={styles.stories}>
              {data.id == 1 ? (
                <View style={styles.circle}>
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#405de6',
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : null}
              <View
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: 'white',
                  borderWidth: 1.8,
                  borderRadius: 100,
                  borderColor: '#c13584',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={data.image}
                  style={{
                    resizeMode: 'cover',
                    width: '92%',
                    height: '92%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  opacity: data.id == 0 ? 1 : 0.5,
                }}>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stories: {
    position: 'relative',
    flexDirection: 'column',
    paddingHorizontal: 8,
  },
  circle: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
  },
});
