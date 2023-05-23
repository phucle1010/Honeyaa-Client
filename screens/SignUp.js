import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const SignUp = (props) => {
    const { navigation } = props;
    const [showRePassword, setShowRePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRePass] = useState('');
    const API_URI = 'http://192.168.1.13:8080';

    const handleShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };
    const handleShowPassword = () => {
        setShowPassword(!showRePassword);
    };
    const handleSignIn = () => {
        switch (true) {
            case phone === '' || pass === '' || repass === '':
                Alert.alert('Warning', 'Please fill all fields');
                break;
            case phone.length < 10:
                Alert.alert('Warning', 'Phone number includes 10 characters');
                break;
            case pass.length < 6:
                Alert.alert('Warning', 'The length of password has to be at least 6 characters');
                break;
            case pass !== repass:
                Alert.alert('Warning', 'Password and Re-password are not the same as');
                break;
            default:
                axios
                    .get(`${API_URI}/api/user/signup/phone?phonenumber=${phone}`)
                    .then((res) => {
                        navigation.navigate('SettingPhoneNumber', { phone: phone, pass: pass });
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response && error.response.status === 500) {
                            Alert.alert('Lỗi', error.response);
                        } else if (error.response && error.response.status === 400) {
                            Alert.alert('Lỗi', error.response);
                        } else if (error.response && error.response.status === 404) {
                            Alert.alert('Lỗi', error.response);
                        } else {
                            Alert.alert('Lỗi', 'Unknown error, please try again later');
                        }
                    });
                break;
        }
    };

    return (
        <View style={styles.container}>
            {/* <View>
                <Image source={require('../assets/img/signup.jpg')} />
            </View> */}
            <View style={styles.body}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    maxLength={10}
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(e) => setPhone(e)}
                />
                <View style={styles.containerPassInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={pass}
                        secureTextEntry={!showPassword}
                        onChangeText={(e) => setPass(e)}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        {showPassword ? (
                            <Icon style={styles.iconEye} name="eye" size={20} />
                        ) : (
                            <Icon style={styles.iconEye} name="eye-slash" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.containerPassInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Re-Password"
                        secureTextEntry={!showRePassword}
                        value={repass}
                        onChangeText={(e) => setRePass(e)}
                    />
                    <TouchableOpacity onPress={handleShowRePassword}>
                        {showRePassword ? (
                            <Icon style={styles.iconEye} name="eye" />
                        ) : (
                            <Icon style={styles.iconEye} name="eye-slash" />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn1} onPress={handleSignIn}>
                    <Text style={{ color: '#FFFFFF' }}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#6952F1' }}>Back to login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
    },
    body: {},
    title: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 30,
        color: '#000000',
        paddingVertical: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#767676',
        height: 46,
        width: '100%',
        marginVertical: 10,
        color: '#767676',
        paddingLeft: 10,
    },
    iconEye: {
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: 1,
        fontSize: 20,
    },
    containerPassInput: {
        flexDirection: 'row',
    },
    btn1: {
        // borderWidth: 1,
        borderRadius: 10,
        height: 46,
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#503EBF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn2: {
        // borderWidth: 1,
        borderRadius: 10,
        height: 46,
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});
export default SignUp;
