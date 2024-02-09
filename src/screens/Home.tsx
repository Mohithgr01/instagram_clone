import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import First from './First';
import Status from './screenComponents/Status';
import EditProfile from './screenComponents/EditProfile';
import Login from './Login';
import {PostProvider} from './screenComponents/PostContext';
import UserProfile from './screenComponents/UserProfile';
import BottomNavigator from '../components/BottomNavigator';
import ProfileDetails from './screenComponents/ProfileDetails';

const Home = () => {
  const Stack = createNativeStackNavigator();
  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="First" component={BottomNavigator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={First} />
          <Stack.Screen name="Status" component={Status} />

          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
};

export default Home;
