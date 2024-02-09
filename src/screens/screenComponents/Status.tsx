import {Text, Animated, PanResponder, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image, Input, InputField, StatusBar, View} from '@gluestack-ui/themed';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
// import Activity from './Activity';

const Status = ({route, navigation}: any) => {
  const {name, image, index, storyInfo} = route.params;

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  const [currentStoryIndex, setCurrentStoryIndex] = useState(index);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsPaused(true);
      progress.stopAnimation();
    },
    onPanResponderRelease: (evt, gestureState) => {
      setIsPaused(false);
      if (gestureState.dx < 10 && gestureState.dy < 10) {
        handleTap();
      } else {
        handleSwipe(gestureState);
      }
      Animated.timing(progress, {
        toValue: 5,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    },
  });

  // const handleTap = () => {
  //   if (currentStoryIndex < storyInfo.length - 1) {
  //     setCurrentStoryIndex(currentStoryIndex + 1);
  //     progress.setValue(0);
  //   } else {
  //     navigation.goBack();
  //   }
  // };

  const handleTap = evt => {
    const screenWidth = Dimensions.get('window').width;
    const pressX = evt.nativeEvent.locationX;
    const centerThreshold = screenWidth / 2;

    if (pressX >= centerThreshold) {
      // Pressed on the right side
      if (currentStoryIndex < storyInfo.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        progress.setValue(0);
      } else {
        navigation.goBack();
      }
    } else {
      // Pressed on the left side
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
        progress.setValue(0);
      } else {
        // Do something if already at the first story
        navigation.goBack();
      }
    }
  };

  const handleSwipe = gestureState => {
    // Your swipe handling logic here
    console.log('Swiped!', gestureState);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    if (!isPaused) {
      Animated.timing(progress, {
        toValue: 5,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isPaused, navigation, currentStoryIndex]);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  return (
    <TouchableOpacity
      onPress={evt => handleTap(evt)}
      {...panResponder.panHandlers}>
      <View
        style={{
          backgroundColor: 'black',
          height: '100%',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
        <View
          style={{
            height: 3,
            width: '95%',
            borderWidth: 1,
            backgroundColor: 'gray',
            position: 'absolute',
            top: 18,
          }}>
          <Animated.View
            style={{
              height: '100%',
              backgroundColor: 'white',
              width: progressAnimation,
            }}></Animated.View>
        </View>
        <View
          style={{
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 12,
            left: 0,
            width: '90%',
          }}>
          <View
            style={{
              borderRadius: 100,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={storyInfo[currentStoryIndex].image}
              style={{
                borderRadius: 100,
                backgroundColor: 'orange',
                resizeMode: 'cover',
                width: '92%',
                height: '92%',
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                paddingLeft: 10,
                zIndex: 2,
              }}>
              {storyInfo[currentStoryIndex].name}
            </Text>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <Zocial
                name="amazon"
                style={{fontSize: 20, color: 'white', opacity: 0.6}}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <Image
          source={storyInfo[currentStoryIndex].image}
          style={{position: 'absolute', width: '100%', height: 300}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 10,
            width: '100%',
          }}>
          <Input
            variant="rounded"
            size="lg"
            style={{
              borderColor: 'white',
              borderRadius: 25,
              width: '95%',
              height: 50,
              paddingLeft: 20,
              borderWidth: 1,
              fontSize: 20,
              color: 'white',
            }}>
            <InputField
              placeholder="send message"
              placeholderTextColor="white"
              color="white"
            />
          </Input>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Zocial name="amazon" style={{fontSize: 30, color: 'white'}} />
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Status;
