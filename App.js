

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginContext from './src/context-global/LoginContext';
import NavigatorApp from './src/navigator/NavigatorApp';
import 'react-native-gesture-handler';
import {
  View,
  StatusBar
} from 'react-native';


const App = () => {
  return (
    <View style={{ flex: 1}}>
      <StatusBar backgroundColor={'#225125'} />
      <NavigationContainer>
        <LoginContext>
          <NavigatorApp/>
        </LoginContext>
      </NavigationContainer>
    </View>
  )
}

export default App;
