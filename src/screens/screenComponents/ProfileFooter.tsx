import React, {useState} from 'react';
import {View, Image, FlatList} from '@gluestack-ui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import {usePostContext} from './PostContext';
// import Profile from '../Profile';
import {blogs} from '../../utils/blogs';
import {Dimensions, TouchableOpacity} from 'react-native';
import ProfileDetails from './ProfileDetails';
import {useNavigation} from '@react-navigation/native';

const ProfileFooter = () => {
  //   const Tab = createMaterialTopTabNavigator();
  //   const [profilePics, setProfilePics] = useState({
  //     profileImage1: require('../storage/images/person7.jpg'),
  //     profileImage2: require('../storage/images/person5.jpg'),
  //     profileImage3: require('../storage/images/person2.jpg'),
  //     profileImage4: require('../storage/images/abcd.png'),
  //   });

  const {posts} = usePostContext();
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  //   const postss = [newPost, ...blogs];
  const newPosts = posts.filter(filterPost => filterPost.isNew);
  const navigation = useNavigation();

  return (
    <View flexDirection="row" flexWrap="wrap">
      {newPosts.map(post => {
        return (
          <View width={Width / 3}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileDetails', {post})}>
              <Image
                source={post.postImage[0]}
                // style={{width: 130, height: 100, marginVertical: 0.5}}
                w={Width / 3}
                h={Height / 3}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileFooter;
