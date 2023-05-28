import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingGender = ({ navigation, route }) => {
    const { phone, pass, name, birthday, photo1, photo } = route.params;
    const [gender, setGender] = useState(1);

    const chooseGender = (_gender) => {
        setGender(_gender);
        navigation.navigate('SettingDatingOriented', { phone, pass, name, birthday, photo, photo1, gender });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 50 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleGoBack()}>
                        <Icon name="arrow-left" style={{ color: '#8B7ED7' }} size={24} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: '#B2B2B2',
                            width: 256,
                            textAlign: 'center',
                            marginLeft: 66 - 24 - 22,
                            marginRight: 66 - 22,
                        }}
                    >
                        Step 4 of 6
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Text style={styles.title}>What's your gender?</Text>
                </View>
            </View>
            <View
                style={{
                    marginTop: 70,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity onPress={() => chooseGender(1)}>
                    <View
                        style={[
                            styles.frameImg,
                            gender === 1 ? { borderColor: '#B2B2B2' } : { borderColor: '#FFFFFF' },
                        ]}
                    >
                        <Image source={require('../assets/img/man.jpg')} style={styles.img} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chooseGender(0)}>
                    <View
                        style={[
                            styles.frameImg,
                            gender === 0 ? { borderColor: '#B2B2B2' } : { borderColor: '#FFFFFF' },
                        ]}
                    >
                        <Image source={require('../assets/img/woman.jpg')} style={styles.img} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
        // marginRight: 87,
    },
    img: {
        width: 160,
        height: 128.23,
    },
    frameImg: {
        width: 168,
        height: 168,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#FFFFFF',
        margin: 5,
    },
});

export default SettingGender;
