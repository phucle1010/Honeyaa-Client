import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
const VerifyOTP = (props) => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Verify phone number</Text>
            <View style={styles.inputRow}>
                <TextInput style={styles.textInput} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} inputMode='numeric' maxLength={1} />
                <TextInput style={styles.textInput} inputMode='numeric' maxLength={1} />

            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("RestoreAccount")}
                style={[{ backgroundColor: '#503EBF', marginTop: 39 }, styles.btn]}>
                <Text style={[{ color: '#FFFFFF' }, styles.btnText]}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
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
        textAlign: 'center'
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
export default VerifyOTP