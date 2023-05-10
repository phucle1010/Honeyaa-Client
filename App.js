import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestoreAccount from './screens/RestoreAccount';
import VerifyOTP from './screens/VerifyOTP';
import VerifyPhoneNumber from './screens/VerifyPhoneNumber';
import BottomTab from './components/BottomTab';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='VerifyPhoneNumber' screenOptions={{headerShown:false}}>
        <Stack.Screen name="RestoreAccount" component={RestoreAccount} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App