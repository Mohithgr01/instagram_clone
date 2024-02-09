import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import First from '../screens/First';
import Addpost from '../screens/Addpost';
import UserProfile from '../screens/screenComponents/UserProfile';
import Entypo from 'react-native-vector-icons/Entypo';

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: 'black',
          justifyContent: 'space-between',
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'First') {
            iconName = focused ? 'home' : 'home';
            size = focused ? size + 8 : size + 2;
            color = 'white';
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'user' : 'user';
            size = focused ? size + 8 : size + 2;
            color = 'white';
          } else if (route.name === 'Addpost') {
            iconName = focused ? 'squared-plus' : 'squared-plus';
            size = focused ? size + 8 : size + 2;
            color = 'white';
          }

          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="First" component={First} />
      <Tab.Screen name="Addpost" component={Addpost} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
