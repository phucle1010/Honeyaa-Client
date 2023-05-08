/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RestoreAccount from './screens/RestoreAccount';
import VerifyPhoneNumber from './screens/VerifyPhoneNumber';
import VerifyOTP from './screens/VerifyOTP';
AppRegistry.registerComponent(appName, () => VerifyPhoneNumber);
