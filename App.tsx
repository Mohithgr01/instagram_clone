import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Suspense} from 'react';

export default function App() {
  return (
    <Suspense>
      <GluestackUIProvider config={config}>
        <Home />
        {/* <Text color="green">Hello World! sdsds</Text> */}
      </GluestackUIProvider>
    </Suspense>
  );
}
