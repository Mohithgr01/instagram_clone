import React, {useState} from 'react';
import {
  View,
  Text,
  Toast,
  Input,
  InputField,
  Image,
  ToastDescription,
  useToast,
} from '@gluestack-ui/themed';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
} from 'react-native-image-picker';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const EditProfile = ({route, navigation}) => {
  const {
    uname,
    // accountName,
    uimage,
    updateName,
    updateImage,
    updateAccName,
    accname,
  } = route.params;
  // console.log(uimage);
  //   console.log('hefgdfkhjgkfkgjr');
  //   const ToastMessage = () => {
  // ToastAndroid.show('Edited successfully', ToastAndroid.SHORT);
  // <ToastDescription>"ayoooo"</ToastDescription>;
  //   };

  // console.log(name);
  const [selectImage, setSelectImage] = useState(uimage);
  // console.log(selectImage);
  const [Uname, setUsername] = useState(uname);
  const [Accname, setAccname] = useState(accname);
  const handleUpdate = (newName, newAccountName) => {
    updateProfileData(newName, newAccountName);
  };

  const imgpicker = () => {
    let options = {
      mediaType: 'photo' as MediaType,

      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  const toast = useToast();
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            // handleUpdate(name, accountName);
            navigation.goBack();
          }}>
          <Ionic name="close-outline" style={{fontSize: 35}} />
        </TouchableOpacity>
        <Text fontSize={'$sm'} fontWeight="bold">
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            updateName(Uname);
            updateImage(selectImage);
            updateAccName(Accname);

            // navigation.goBack();
            // ToastMessage();
            toast.show({
              placement: 'top',
              render: () => {
                return (
                  <Toast action="attention" variant="solid">
                    <ToastDescription>Edited Successfully</ToastDescription>
                  </Toast>
                );
              },
            });
            navigation.goBack();
          }}>
          <Ionic name="checkmark" style={{fontSize: 35, color: '#3493D9'}} />
        </TouchableOpacity>
      </View>
      <View p={20} alignItems="center">
        <Image
          source={selectImage}
          alt="sdsdsd"
          style={{width: 80, height: 80, borderRadius: 100}}
        />
        <TouchableOpacity onPress={imgpicker}>
          <Text color="#3493D9">Change profile picture</Text>
        </TouchableOpacity>
      </View>
      <View p={10}>
        <View>
          <Text opacity={0.5}>Name</Text>
          <Input>
            <InputField
              placeholder="name"
              onChangeText={text => setUsername(text)}
              defaultValue={Uname}
              fontSize={16}
              borderBottomWidth={1}
              borderColor="#CDCDCD"></InputField>
          </Input>
        </View>
        <View paddingVertical={10}>
          <Text opacity={0.5}>Username</Text>
          <Input>
            <InputField
              placeholder="accountname"
              defaultValue={Accname}
              onChangeText={text => setAccname(text)}
              fontSize={16}
              borderBottomWidth={1}
              borderColor="#CDCDCD"></InputField>
          </Input>
        </View>
        <View paddingVertical={10}>
          <Input>
            <InputField
              placeholder="Website"
              fontSize={16}
              borderBottomWidth={1}
              borderColor="#CDCDCD"></InputField>
          </Input>
        </View>
        <View paddingVertical={10}>
          <Input>
            <InputField
              placeholder="Bio"
              fontSize={16}
              borderBottomWidth={1}
              borderColor="#CDCDCD"></InputField>
          </Input>
        </View>
        <View>
          <Text
            marginVertical={10}
            padding={10}
            color="#3493D9"
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="#EFEFEF">
            Switch to Professional Account
          </Text>
          <Text
            marginVertical={10}
            padding={10}
            color="#3493D9"
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="#EFEFEF">
            Personal Information Setting
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
