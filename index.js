/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RestoreAccount from './screens/RestoreAccount';
import VerifyPhoneNumber from './screens/VerifyPhoneNumber';
import VerifyOTP from './screens/VerifyOTP';
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
import ProfileScreen from './screens/ProfileScreen';
import SettingProfile from './screens/SettingProfile';
import Discover from './screens/Discover';
import Tendency from './screens/Tendency';
import AnswerQuestion from './screens/AnswerQuestion'

AppRegistry.registerComponent(appName, () => Tendency);
