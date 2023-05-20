import React, { Component, useState, useEffect} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';

const FinishSignUp = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Image source={require('../assets/img/FinishSignUp.png')} style={{width: 423, height: 423, borderWidth: 1}}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <Text style={styles.title}>Your profile is set</Text>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color: '#FFFFFF'}}>let's match</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22, 
        backgroundColor: 
        '#FFFFFF', 
        padding: 74
    },
    title: {
        fontSize: 24,
        color: '#000000'
    },
    listInterest: {
        flexDirection: 'row-reverse'
    },
    itemInterest: {
        height: 46,
        width: 116,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 100,
        padding: 5,
        margin: 5,
    },
    btn: {
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF',
        marginTop: 60,
        width: '100%'
    },
});

export default FinishSignUp;
