import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, } from 'react-native'
import axios from 'axios';

const VerifyPhoneNumber = (props) => {
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')
    const { navigation } = props
    const API_URL = 'http://192.168.0.134:8080';
    let lastRequestTime = null;
    const MIN_REQUEST_INTERVAL = 10000; 
    const sendOtp = () => {
        if (lastRequestTime && Date.now() - lastRequestTime < MIN_REQUEST_INTERVAL) {
            setMessage('The request was too fast, please try again after ' + (MIN_REQUEST_INTERVAL / 1000) + ' second');
        }else if (phone.length!=10 || phone.charAt(0)!='0'){
            setMessage('Please enter a correct phone number');
            return;
        }
        axios.get(`${API_URL}/verifyPhone?phonenumber=${phone}`)
            .then(response => {
                setMessage('')
                navigation.navigate('VerifyOTP', { phone: phone })
            })
            .catch(error => {
                console.log(error);
                lastRequestTime = Date.now();
                if (error.response && error.response.status === 500) {
                    setMessage('System error, please try again later');
                } 
                else if(error.response && error.response.status === 400){
                    setMessage('Please enter a correct phone number')
                }else if(error.response && error.response.status === 404){
                    setMessage('This phone number is not registered with Honeyaa')
                }else {
                    setMessage('Unknown error, please try again later');
                }
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify phone number</Text>
            <View style={styles.inputRow}>

                <TextInput
                    onChangeText={(text) => { setPhone(text);setMessage('') }}
                    style={styles.textInput}
                    keyboardType='numeric'
                    placeholder='Phone'
                    placeholderTextColor={'#A6A6A6'}
                />
            </View>
            {message?<Text style={{color:'red',alignSelf:'center',marginTop:10}}>{message}</Text>:null}
            <TouchableOpacity
                onPress={sendOtp}
                style={[{ backgroundColor: '#503EBF', marginTop: 48 }, styles.btn]}>
                <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('VerifyOTP')}
                style={[{
                    marginTop: 30,
                    backgroundColor: '#FFFFFF',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25, shadowRadius: 2, elevation: 7
                },
                styles.btn]}>
                <Text style={[{ color: '#6952F1' }, styles.btnText]}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold'
    },
    inputRow: {
        flexDirection: 'row',
        marginTop: 48
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#767676',
        height: 46,
        borderRadius: 10,
        fontSize: 18,
        paddingHorizontal: 10,
        color:'#000000'
    },
    iconEye: {
        fontSize: 23,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        color: '#797979'
    },
    btn: {
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18
    }
})
export default VerifyPhoneNumber