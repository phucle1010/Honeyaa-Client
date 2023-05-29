import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestoreAccount from './screens/RestoreAccount';
import VerifyOTP from './screens/VerifyOTP';
import VerifyPhoneNumber from './screens/VerifyPhoneNumber';
import BottomTab from './components/BottomTab';
import SettingPhoneNumber from './screens/SettingPhoneNumber';
import VerifyPhone from './screens/VerifyPhone';
import SettingName from './screens/SettingName';
import SettingBirth from './screens/SettingBirth';
import SettingAddPhotos from './screens/SettingAddPhotos';
import SettingGender from './screens/SettingGender';
import SettingDateObject from './screens/SettingDateObject';
import SettingInterest from './screens/SettingInterest';
import FinishSignUp from './screens/FinishSignUp';
import SignUp from './screens/SignUp';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomTab' screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="RestoreAccount" component={RestoreAccount} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
        <Stack.Screen name="SettingPhoneNumber" component={SettingPhoneNumber} />
        <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
        <Stack.Screen name="SettingName" component={SettingName} />
        <Stack.Screen name="SettingBirth" component={SettingBirth} />
        <Stack.Screen name="SettingAddPhotos" component={SettingAddPhotos} />
        <Stack.Screen name="SettingGender" component={SettingGender}/>
        <Stack.Screen name="SettingDateObject" component={SettingDateObject}/>
        <Stack.Screen name="SettingInterest" component={SettingInterest}/>
        <Stack.Screen name="FinishSignUp" component={FinishSignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App