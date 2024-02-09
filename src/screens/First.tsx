import {SafeAreaView} from 'react-native';
import React from 'react';
import {ScrollView, StatusBar, Text, View} from '@gluestack-ui/themed';
import Stories from './screenComponents/Stories';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import Post from './screenComponents/Post';
import Footer from './screenComponents/Footer';
import BottomNavigator from '../components/BottomNavigator';

export default function First() {
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          marginTop: 5,
          alignItems: 'center',
        }}>
        {/* <Text>sdasd</Text> */}
        <FontAwesome name="plus-square" size={20} />
        {/* <AntDesign name="" style={{color: 'red', fontSize: 50}} /> */}
        {/* <Icon as={CalendarDaysIcon} size="md" /> */}

        <Text style={{fontSize: 25, fontWeight: '500', fontFamily: 'Lobster'}}>
          Instagram
        </Text>
        <Feather name="navigation" style={{fontSize: 24}} />
      </View>
      {/* <ScrollView> */}
      {/* <Stories /> */}
      <Post />
      {/* <BottomNavigator /> */}
      {/* <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <Ionic
          name="reload-circle-sharp"
          style={{fontSize: 60, opacity: 0.2}}
        />
      </View> */}
      {/* <Footer /> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
