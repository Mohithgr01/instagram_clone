import React, {useState} from 'react';
import {View, Text, Input, InputField} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import Billabong from 'react-native-vector-icons/Fonts/Billabong';
import Lobster from 'react-native-vector-icons/Fonts/Lobster';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleLogin = () => {
    if (!username.trim()) {
      setUsernameError('Username cannot be empty');
      return;
    }

    // Perform login logic here
    navigation.navigate('First');
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.title} size="4xl">
        Instagram
      </Text>
      <Input
        variant="outline"
        size="md"
        mt={20}
        width={300}
        isDisabled={false}
        isInvalid={Boolean(usernameError)}
        isReadOnly={false}>
        <InputField
          placeholder="username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameError('');
          }}
        />
      </Input>
      {usernameError ? (
        <Text color="red" paddingTop={5}>
          {usernameError}
        </Text>
      ) : null}
      <View paddingTop={20}>
        <TouchableOpacity
          style={{backgroundColor: '#318CE7', borderRadius: 8}}
          onPress={handleLogin}>
          <Text
            color="white"
            // fontWeight="600"
            bold
            paddingHorizontal={50}
            paddingVertical={8}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Billabong', // Apply font family
    fontSize: 32, // You may adjust the font size as needed
  },
});

export default Login;
