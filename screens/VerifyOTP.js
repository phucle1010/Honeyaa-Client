import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';
const VerifyOTP = (props) => {
    const { navigation, route } = props
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourInputRef = useRef(null);
    const [otp, setOtp] = useState('')
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [message, setMessage] = useState('');
    const API_URL = 'http:// 192.168.154.37:8080';
    useEffect(()=>{
        setOtp(input1.concat(input2,input3,input4))
    },[input1,input2,input3,input4])
    const handleFirstInputChange = (text) => {
        if (text.length === 1) {
          secondInputRef.current.focus()
        }
      };
      const handleFirstInputChange1 = (text) => {
        if (text.length === 1) {
          thirdInputRef.current.focus()
        }
      };
      const handleFirstInputChange2 = (text) => {
        if (text.length === 1) {
          fourInputRef.current.focus()
        }
      };
    const ConfirmOTP = () => {
        if(otp.length!=4){
            setMessage("Invalid OTP code")
            return;
        }
        axios.get(`${API_URL}/verifyOTP?phonenumber=${route.params.phone}&code=${otp}`)
            .then(response => {
                setMessage('')
                setInput1('')
                setInput2('')
                setInput3('')
                setInput4('')
                navigation.navigate('RestoreAccount', { phone: route.params.phone })
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status === 500) {
                    setMessage('System error, please try again later');
                }else  if (error.response && error.response.status === 404) {
                    setMessage('This OTP code is expired');
                    console.log(error.response)
                }else {
                    setMessage('Unknown error, please try again later');
                    console.log(error.response)
                }
            });
    };
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Verify phone number</Text>

            <View style={styles.inputRow}>
                <TextInput style={styles.textInput} autoFocus={true} onChangeText={(text)=>{setInput1(text);handleFirstInputChange(text)}} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} ref={secondInputRef} onChangeText={(text)=>{setInput2(text);handleFirstInputChange1(text)}} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} ref={thirdInputRef} onChangeText={(text)=>{setInput3(text);handleFirstInputChange2(text)}} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} ref={fourInputRef} onChangeText={(text)=>{setInput4(text)}} inputMode='numeric' maxLength={1} />

            </View>
            {message?<Text style={{color:'red',alignSelf:'center',marginTop:10}}>{message}</Text>:null}
            <TouchableOpacity
                onPress={ConfirmOTP}
                style={[{ backgroundColor: '#503EBF', marginTop: 39 }, styles.btn]}>
                <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {navigation.goBack();
                setInput1('')
                setInput2('')
                setInput3('')
                setInput4('')}}
                style={[{ marginTop: 30, backgroundColor: '#FFFFFF', shadowColor: 'black', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 2, elevation: 7 }, styles.btn]}>
                <Text
                    style={[{
                        color: '#6952F1'
                    },
                    styles.btnText]}>Back to Login</Text>
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
        marginTop: 39,
        justifyContent: 'space-around'
    },
    textInput: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderColor: '#767676',
        borderRadius: 32,
        fontSize: 18,
        paddingHorizontal: 10,
        fontSize: 24,
        textAlign: 'center',
        color:'#333'
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
    },
})
export default VerifyOTP