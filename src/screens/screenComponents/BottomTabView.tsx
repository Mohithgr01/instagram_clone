// import React, {useState} from 'react';
// import {View, Text, ScrollView, Image, FlatList} from '@gluestack-ui/themed';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import {usePostContext} from './PostContext';
// import Profile from '../Profile';

// const BottomTabView = () => {
//   const Tab = createMaterialTopTabNavigator();
//   const [profilePics, setProfilePics] = useState({
//     profileImage1: require('../storage/images/person7.jpg'),
//     profileImage2: require('../storage/images/person5.jpg'),
//     profileImage3: require('../storage/images/person2.jpg'),
//     profileImage4: require('../storage/images/abcd.png'),
//   });

//   const Video = () => {
//     return (
//       <View
//         showsVerticalScrollIndicator={false}
//         width={'$full'}
//         height={'$full'}>
//         <View
//           w={'$full'}
//           height={'$full'}
//           backgroundColor="white"
//           flexWrap="wrap"
//           flexDirection="row"
//           paddingVertical={5}
//           justifyContent="space-between">
//           {/* {squares} */}
//         </View>
//       </View>
//     );
//   };

//   const Tags = () => {
//     return (
//       <View
//         showsVerticalScrollIndicator={false}
//         width={'$full'}
//         height={'$full'}>
//         <View
//           w={'$full'}
//           height={'$full'}
//           backgroundColor="white"
//           flexWrap="wrap"
//           flexDirection="row"
//           paddingVertical={5}
//           justifyContent="space-between"></View>
//       </View>
//     );
//   };
//   return (
//     <Tab.Navigator
//       tabBarPosition="bottom"
//       screenOptions={({route}) => ({
//         tabBarShowLabel: false,
//         tabBarIndicatorStyle: {
//           backgroundColor: 'black',
//           height: 1.5,
//         },
//         tabBarIcon: ({focused, colour}) => {
//           let iconName;
//           if (route.name === 'Posts') {
//             iconName = focused ? 'apps-sharp' : 'apps-sharp';
//             colour = focused ? 'black' : 'gray';
//           } else if (route.name === 'Video') {
//             iconName = focused ? 'play-circle' : 'play-circle-outline';
//             colour = focused ? 'black' : 'gray';
//           } else if (route.name === 'Tags') {
//             iconName = focused ? 'person' : 'person-outline';
//             colour = focused ? 'black' : 'gray';
//           }
//           return <Ionic name={iconName} color={colour} size={22} />;
//         },
//       })}>
//       {/* <Tab.Screen name="Posts" component={Posts} /> */}
//       <Tab.Screen name="Video" component={Video} />
//       <Tab.Screen name="Tags" component={Tags} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabView;
