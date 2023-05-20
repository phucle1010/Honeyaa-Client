import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const SettingPhoneNumber = (props) => {
    const {navigation, route} = props;
    const {phone, pass} = route.params;
    const handleReturn = () => {
        navigation.goBack();
    }
    const handleConfirmPhoneNB = () => {
        navigation.navigate('VerifyPhone', {phone: phone, pass: pass});
    } 
    return (
        <View style={styles.container}>
            <View style={{flex: 1/5, flexDirection: 'row', marginTop: 61,}}>
                <TouchableOpacity style={{width: 24, height: 24}} onPress={handleReturn}>
                    <Icon name='arrow-left' style={{color: '#8B7ED7'}} size={24}  />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>
                        What's your phone number?
                    </Text>
                </View>
                <View style={styles.containerInput}>
                    <View style={styles.inputRow}>
                        <TextInput 
                            style={styles.input} 
                            placeholder='| (+84)' 
                            keyboardType='numeric'
                            value={phone}
                            maxLength={10}/>
                        <Image style={styles.img} source={require('../assets/img/flagvn.png')}/>
                    </View>
                    <View style={styles.containerErrMessage}>
                    </View>
                </View>
                <View style={styles.containerBtn}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => handleConfirmPhoneNB()}>
                        <Text style={{color: '#FFFFFF'}}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    body: {
        flex: 4/5,
    },
    containerTitle: {
        minHeight: 150,
    },
    title: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 32,
        lineHeight: 48,
        alignItems: 'center',
        display: 'flex',
        color: '#000000',
    },
    containerInput: {
        flex: 1/4,
        height: 100,
        minHeight: 100,
    },
    inputRow: {
        flexDirection: 'row',
    },
    input: {
        width: '100%',
        minHeight: 46,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 50,
        fontSize: 20,
        fontStyle:'normal',
        fontWeight: '300',
        display: 'flex',
        alignItems:'center',
        color: '#A6A6A6',
    },
    img: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    containerErrMessage: {
        height: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    err: {
        color: 'red',
    },
    containerBtn: {
        flex: 1/4,
        marginTop: 25,
    },
    btn: {
        width: '100%',
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#503EBF',
    },
})
export default SettingPhoneNumber