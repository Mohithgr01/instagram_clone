import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {View, Text, ScrollView} from '@gluestack-ui/themed';
import {ProfileBody, ProfileButtons} from './screenComponents/ProfileBody';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomTabView from './screenComponents/BottomTabView';
import {usePostContext} from './screenComponents/PostContext';

export default function Profile() {
  const {posts} = usePostContext();
  const [profileData, setProfileData] = useState({
    name: 'Andrew',
    accountName: 'mr Sherman',
    profileImage: require('../screens/storage/images/person5.jpg'),
    followers: 'followerCount',
    following: 'followingCount',
    post: 'postsCount',
  });

  const newPosts = posts.filter(filterPost => filterPost.isNew);

  const [counts, setCounts] = useState({
    postsCount: newPosts.length,
    followerCount: '48M',
    followingCount: '200',
  });

  useEffect(() => {
    // Update the post count when the posts array changes
    setCounts(prevCounts => ({...prevCounts, postsCount: newPosts.length}));
  }, [posts]);

  const updateProfileData = (name, accountName) => {
    setProfileData(prevState => ({
      ...prevState,
      name: name,
      accountName: accountName,
    }));
  };
  let circles = [];
  let noOfCircles = 10;

  for (let index = 0; index < noOfCircles; index++) {
    circles.push(
      <View>
        {index === 0 ? (
          <View
            width={60}
            height={60}
            borderRadius={100}
            borderWidth={1}
            opacity={0.7}
            marginHorizontal={5}
            // mt={15}
            justifyContent="center"
            alignItems="center">
            <Entypo name="plus" fontSize={40} color="black" />
          </View>
        ) : (
          <View
            w={60}
            h={60}
            borderRadius={100}
            backgroundColor="black"
            opacity={0.1}
            marginHorizontal={5}></View>
        )}
      </View>,
    );
  }
  return (
    <View style={styles.container}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody {...profileData} counts={counts} />

        {/* <ProfileButtons
          {...profileData}
          updateProfileData={updateProfileData}
        /> */}
      </View>
      <View>
        <Text p={10} letterSpacing={1} fontSize={14}>
          Story Highlights
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          paddingVertical={5}
          paddingHorizontal={10}>
          {circles}
        </ScrollView>
      </View>
      {/* <BottomTabView /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'white',
  },
});
