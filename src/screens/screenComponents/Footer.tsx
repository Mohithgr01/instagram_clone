import {View, Text, Image} from '@gluestack-ui/themed';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import First from '../First';
import Reels from '../Addpost';
import Profile from '../Profile';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View position="absolute" bottom={0} left={0} backgroundColor="black">
      <View
        flexDirection="row"
        justifyContent="space-between"
        width={'$full'}
        padding={10}>
        <TouchableOpacity>
          <Entypo
            name="home"
            color="white"
            size={30}
            onPress={() => navigation.navigate('First')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search1" color="white" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="plus-square"
            color="white"
            size={30}
            onPress={() => navigation.navigate('Reels')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../storage/images/person1.jpg')}
            alt="usssername"
            height={30}
            width={30}
            borderRadius={50}
            marginRight={10}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
