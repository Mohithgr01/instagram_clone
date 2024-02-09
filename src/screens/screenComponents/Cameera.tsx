import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Image} from '@gluestack-ui/themed';
import {useState, useEffect} from 'react';
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const Cameera = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = Camera.getCameraPermissionStatus();
    const microphonePermission = Camera.getMicrophonePermissionStatus();
    console.log(cameraPermission);
  };
  if (device == null) return <ActivityIndicator />;

  // const Camera = () => {
  //   const [image, setImage] = useState(null);

  //   const handleCameraPress = () => {
  //     ImagePicker.launchCamera(
  //       {mediaType: 'photo'},
  //       (response: ImagePickerResponse) => {
  //         if (!response.didCancel) {
  //           setImage(response.assets[0].uri);
  //         }
  //       },
  //     );
  //   };

  //   const handleGalleryPress = () => {
  //     ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
  //       if (!response.didCancel) {
  //         setImage(response.uri);
  //       }
  //     });
  //   };
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {/* <TouchableOpacity onPress={handleCameraPress}>
        <Text>Open Camera</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity>
        <Text>Open Gallery</Text>
      </TouchableOpacity> */}
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </SafeAreaView>
  );
};

export default Cameera;
