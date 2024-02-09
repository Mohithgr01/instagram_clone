import {SafeAreaView, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  Text,
  View,
  FormControl,
  FormControlLabelText,
  FormControlLabel,
  Input,
  InputField,
  VStack,
  Heading,
  Image,
  HStack,
} from '@gluestack-ui/themed';
import React from 'react';
import {
  launchImageLibrary,
  launchCamera,
  MediaType,
} from 'react-native-image-picker';
import {useState} from 'react';
import Materialicon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Post from './screenComponents/Post';
import {useNavigation} from '@react-navigation/native';
import {usePostContext} from './screenComponents/PostContext';

const Addpost = () => {
  const [selectImage, setSelectImage] = useState('');
  const [caption, setCaption] = useState('');
  const {addPost} = usePostContext();

  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [editedCaption, setEditedCaption] = useState('');

  const navigation = useNavigation();
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

  const openCamera = () => {
    let options = {
      mediaType: 'photo' as MediaType,

      storageOptions: {
        path: 'image',
      },
    };
    launchCamera(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  const handleImage = () => {
    // Assuming selectImage contains the URI of the selected image
    if (caption && selectImage) {
      const newPost = {
        id: Date.now(), // Generate a unique id for the post
        postTitle: 'Andrew',
        postPersonImage: require('./storage/images/abcd.png'), // Assuming a default profile image
        postImage: [selectImage],
        likes: 0,
        isLiked: false,
        caption: caption,
      };
      addPost(newPost);
      setCaption(''); // Reset caption field
      setSelectImage('');
      navigation.navigate('First'); // Navigate back after adding the post
    } else {
      // Handle case where caption or image is not selected
      Alert.alert('Please select an image and add a caption');
    }
  };
  return (
    <SafeAreaView>
      {/* <Text>Add Post</Text>
      <FormControl
        size="md"
        p="$4"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        isRequired={false}>
        <FormControlLabel mb="$1">
          <FormControlLabelText>Caption</FormControlLabelText>
        </FormControlLabel>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          paddingHorizontal={50}>
          <InputField color="red" placeholder="Add caption" />
        </Input>
      </FormControl> */}

      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800">
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">
            Add Post
          </Heading>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Caption
            </Text>
            <Input>
              <InputField
                type="text"
                value={caption} // Bind the caption state to the input value
                onChangeText={setCaption}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <View p={20} alignItems="center">
              {selectImage ? (
                <Image
                  // source={selectImage}
                  source={{uri: selectImage}}
                  alt="sdsdsd"
                  style={{width: 80, height: 80, borderRadius: 100}}
                />
              ) : null}
              <TouchableOpacity onPress={imgpicker}>
                {/* <Text color="$text500" lineHeight="$xs">
                  Add Image
                </Text> */}
                <View backgroundColor="#F56666" borderRadius={8}>
                  <HStack alignItems="center" p={8}>
                    <Text color="white" bold>
                      Choose from gallery
                    </Text>
                    <Materialicon
                      paddingLeft={8}
                      name="add-a-photo"
                      color="white"
                      size={20}
                    />
                  </HStack>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={openCamera}
                style={{paddingVertical: 10}}>
                <View backgroundColor="#F56666" borderRadius={8}>
                  <HStack alignItems="center" p={8}>
                    <Text color="white" bold>
                      Open Camera
                    </Text>
                    <MaterialCommunityIcons
                      name="view-gallery-outline"
                      color="white"
                      paddingLeft={8}
                      size={20}
                    />
                  </HStack>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleImage}>
                <Text color="#00CCFF" lineHeight="$xs">
                  Add Image
                </Text>
              </TouchableOpacity>
            </View>
          </VStack>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
};

export default Addpost;

const styles = StyleSheet.create({});
