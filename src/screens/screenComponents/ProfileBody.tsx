import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, View, Text} from '@gluestack-ui/themed';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
  counts,
}: any) => {
  // const {Uname} = route.params;
  // console.log('pffff', route.params);

  // const {updatedName} = route.params || {};
  // console.log('updated', updatedName);

  const navigation = useNavigation();
  const [uname, setName] = useState(name);
  const [uimage, setUImage] = useState(profileImage);
  const [accname, setAccName] = useState(accountName);

  function updateName(updatedName) {
    setName(updatedName);
  }
  function updateImage(updatedImage) {
    setUImage(updatedImage);
  }
  function updateAccName(updatedAccName) {
    setAccName(updatedAccName);
  }

  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {accname}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: 'black',
                paddingHorizontal: 15,
              }}
            />
            <Feather
              name="menu"
              style={{
                fontSize: 25,
              }}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={uimage}
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            {uname}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {counts.postsCount}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {counts.followerCount}
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {counts.followingCount}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
      <View flexDirection="row" justifyContent="space-evenly">
        <TouchableOpacity
          style={{
            backgroundColor: '#0076CE',
            maxWidth: 500,
            borderRadius: 20,
          }}
          onPress={() =>
            navigation.navigate('EditProfile', {
              uname,
              uimage,
              // accountName,
              accname,
              updateName,
              updateImage,
              updateAccName,
            })
          }>
          <Text
            color="white"
            paddingHorizontal={20}
            paddingVertical={7}
            fontWeight="bold">
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#0076CE', maxWidth: 500, borderRadius: 20}}>
          <Text
            color="white"
            paddingHorizontal={20}
            paddingVertical={7}
            fontWeight="bold">
            Share Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export const ProfileButtons = ({
//   name,
//   accountName,
//   profileImage,
//   updateProfileData,
// }) => {
//   const navigation = useNavigation();

//   return (
//     <>
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-evenly',
//           paddingVertical: 5,
//         }}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.push('EditProfile', {
//               name: name,
//               accountName: accountName,
//               profileImage: profileImage,
//               updateProfileData: updateProfileData,
//               updateName,
//             })
//           }
//           style={{
//             width: '100%',
//           }}>
//           <View
//             style={{
//               width: '100%',
//               height: 35,
//               borderRadius: 5,
//               borderColor: '#DEDEDE',
//               borderWidth: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 14,
//                 letterSpacing: 1,
//                 opacity: 0.8,
//               }}>
//               Edit Profile
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };
