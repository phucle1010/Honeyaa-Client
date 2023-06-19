import React, { useEffect, useState } from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    Alert,
    ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
    LoginButton,
    AccessToken,
    LoginManager,
    Settings,
    Profile,
    AuthenticationToken,
} from 'react-native-fbsdk-next';
import { useSelector } from 'react-redux';
import { setUser } from '../reducers/user';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import API_URL from '../services/apiRoute';

const SignIn = ({ navigation }) => {
    const initUserInput = {
        phone: '',
        pass: '',
    };
    const isFocusedScreen = useIsFocused();
    const [userInput, setUserInput] = useState(initUserInput);
    const [successLogin, setSuccessLogin] = useState(false);
    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        if (successLogin) {
            navigation.navigate('Home', {
                successfulLogin: true,
            });
        }
    }, [successLogin]);

    useEffect(() => {
        if (isFocusedScreen) {
            DeviceInfo.getUniqueId().then((device_id) => setDeviceId(device_id));
        } else {
            setDeviceId(null);
        }
    }, [isFocusedScreen]);

    const handleLogin = async () => {
        await axios
            .post(`${API_URL}/api/user/login`, {
                ...userInput,
                device_id: deviceId,
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    Alert.alert('Warning', res.data.responseData);
                } else {
                    const token = res.data.responseData;
                    AsyncStorage.setItem('user_token', JSON.stringify(token)).then(() => {
                        setSuccessLogin(true);
                        setUserInput(initUserInput);
                        Alert.alert('Success', 'Login successfully');
                    });
                }
            })
            .catch((err) => Alert.alert('Error', err));
    };

    const onGoogleSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo });
        } catch (error) {
            console.log({ error });
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
            } else {
            }
        }
    };

    const onGoogleSignout = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    const onFacebookSignin = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        return auth().signInWithCredential(facebookCredential);
    };

    function onAuthStateChanged(user) {
        // setUserInfo(user);
        // console.log(user);
        // if (user) setloggedIn(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.imgbackground} source={require('../assets/img/background-login.png')}>
                <View style={styles.section}>
                    <View>
                        {/* <Image style={styles.imgbackground} source={require('../sources/images/dating-App.png')} /> */}
                        <Text style={styles.txthead}>Welcome to Honeyaa</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.phone}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            defaultValue={userInput.phone}
                            onChangeText={(phone) =>
                                setUserInput((prevUser) => {
                                    return {
                                        ...prevUser,
                                        phone,
                                    };
                                })
                            }
                        />
                    </View>
                    <View style={styles.passcontainer}>
                        <TextInput
                            style={styles.password}
                            placeholder="Password"
                            secureTextEntry={true}
                            defaultValue={userInput.pass}
                            onChangeText={(pass) =>
                                setUserInput((prevUser) => {
                                    return {
                                        ...prevUser,
                                        pass,
                                    };
                                })
                            }
                        />
                        <TouchableOpacity>
                            <Image style={styles.icon} source={require('../sources/icons/eye.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.options}>
                        <Text style={styles.txtRemember}>Remember me</Text>
                        <TouchableOpacity>
                            <Text style={styles.txtForgotPass}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnlogin} onPress={handleLogin}>
                            <Text style={styles.txtbtn}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.txt1}>You don't have any account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.txt2}>Create new here</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.txtline}> ──────── OR ──────── </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnloginFb} onPress={onFacebookSignin}>
                            <Text style={styles.txtFb}>Sign In with Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnloginGg} onPress={onGoogleSignin}>
                            <Text style={styles.txtGg}>Sign In with Google</Text>
                        </TouchableOpacity>
                        {/* <GoogleSigninButton
                    style={styles.btnloginGg}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    // onPress={this._signIn}
                    // disabled={this.state.isSigninInProgress}
                /> */}
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txthead: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#777676',
        textAlign: 'center',
        marginHorizontal: 33,
    },
    imgbackground: {
        flex: 1,
        justifyContent: 'center',
    },
    phone: {
        width: 346,
        height: 46,
        borderRadius: 10,
        marginHorizontal: 19,
        padding: 10,
        borderWidth: 1,
        borderColor: '#767676',
        marginBottom: 20,
        marginTop: 60,
    },
    passcontainer: {
        flexDirection: 'row',
        width: 346,
        height: 46,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#767676',
        alignItems: 'center',
    },
    password: {
        flex: 1,
        paddingHorizontal: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 10,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 19,
    },
    checkbox: {
        alignSelf: 'center',
    },
    txtRemember: {
        fontFamily: 'Overpass',
        fontSize: 14,
        fontWeight: 300,
        color: '#000000',
    },
    txtForgotPass: {
        fontFamily: 'Overpass',
        fontSize: 14,
        fontWeight: 300,
        marginLeft: 100,
        color: '#B74545',
    },
    btnlogin: {
        marginTop: 20,
        marginHorizontal: 19,
        backgroundColor: '#503EBF',
        width: 346,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnloginGg: {
        marginTop: 20,
        marginHorizontal: 19,
        backgroundColor: '#FFDCDC',
        width: 346,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnloginFb: {
        marginTop: 20,
        marginHorizontal: 19,
        backgroundColor: '#DCEEFF',
        width: 346,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    txtbtn: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Poppins',
        color: '#fff',
    },
    txtGg: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Poppins',
        color: '#DB4141',
    },
    txtFb: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Poppins',
        color: '#006ED4',
    },
    txt1: {
        marginTop: 15,
        fontFamily: 'Overpass',
        fontSize: 13,
        color: '#8C8C8C',
    },
    txt2: {
        marginLeft: 4,
        marginTop: 15,
        fontFamily: 'Overpass',
        fontSize: 13,
        color: '#503EBF',
        fontWeight: 'bold',
    },
    signUpContainer: {
        flexDirection: 'row',
    },
    txtline: {
        marginTop: 15,
        color: '#959595',
    },
});

export default SignIn;
