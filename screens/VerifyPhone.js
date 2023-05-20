import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { text } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';

const VerifyPhone = (props) => {
    const { navigation, route } = props
    const {phone, pass} = route.params;
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourInputRef = useRef(null);
    const [otp, setOtp] = useState('')
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [message, setMessage] = useState('');
    const API_URL = 'http://192.168.251.150:8080';
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
        axios.get(`${API_URL}/verifyOTP?phonenumber=${phone}&code=${otp}`)
            .then(response => {
                setMessage('')
                setInput1('')
                setInput2('')
                setInput3('')
                setInput4('')
                navigation.navigate('SettingName', { phone: phone, pass: pass })
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
            <View style={styles.containVector}>
                <TouchableOpacity style={styles.vector} onPress={() => {navigation.goBack()}}>
                    <Icon style={styles.arrowleft} name='arrow-left' size={24}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Verify your phone number?</Text>
            <Text style={styles.text}>Enter the code we’ve send by text to {phone} Change </Text>
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
                <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Continue</Text>
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
    containVector: {
        position: 'absolute',
        width: 24,
        height: 24,
        left: 22,
        top: 73,
    },
    vector:{
        width: 24, 
        height: 24,
    },
    arrowleft: {
        color: '#8B7ED7',
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
    btn: {
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 18
    },
    text: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 27,
        display: 'flex',
        alignItems: 'center',
        color: '#000000',
    },
})
export default VerifyPhone