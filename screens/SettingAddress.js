import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import API_URI from '../services/apiRoute';

const { width, height } = Dimensions.get('window');

const SettingAddress = ({ navigation, route }) => {
    const [address, setAddress] = useState('');
    const { phone, pass, name, birthday, photo, photo1, gender, obgender, interests } = route.params;

    const handleGetLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            const granted1 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED && granted1 === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (info) => {
                        console.log(info.coords.latitude, info.coords.longitude);
                        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${info.coords.latitude},${info.coords.longitude}&key=AIzaSyDvWoAfSGthu6If2HfoUMrgBGOvj9cn-bQ`;
                        fetch(apiUrl)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                console.log(responseJson.results.length);
                                if (responseJson.results.length > 0) {
                                    let detailAddress = '';
                                    responseJson.results[0].address_components.forEach((item, index) => {
                                        if (index > 0) {
                                            detailAddress += item.long_name;
                                            if (index < responseJson.results[0].address_components.length - 1) {
                                                detailAddress += ', ';
                                            }
                                        }
                                    });
                                    setAddress(detailAddress);
                                } else {
                                    setAddress(
                                        'Amphitheatre Parkway, Mountain View, Santa Clara County, California, United States, 94043',
                                    );
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    },
                    (error) => {
                        console.log('Lỗi lấy vị trí:', error);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 20000,
                        maximumAge: 1000,
                    },
                );
            } else {
                console.log('Quyền truy cập vị trí bị từ chối.');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleFinish = () => {
        axios
            .post(`${API_URI}/api/user/signup`, {
                phone,
                pass,
                name,
                birthday,
                photo,
                photo1,
                gender,
                obgender,
                interests,
                address,
            })
            .then((res) => {
                if (res.status === 200) {
                    navigation.navigate('FinishSignUp', route);
                }
            })
            .catch((err) => Alert.alert(err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => handleGoBack()}>
                    <Icon name="arrow-left" style={{ color: '#8B7ED7' }} size={24} />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#B2B2B2',
                        width: 256,
                        height: 21,
                        textAlign: 'center',
                        marginLeft: 66 - 24 - 22,
                        marginRight: 66 - 22,
                    }}
                >
                    Step 7 of 7
                </Text>
            </View>
            <View style={styles.modalContainer}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View
                            style={{
                                flex: 1,
                                color: '#333',
                                width: '100%',
                                marginTop: 50,
                            }}
                        >
                            <Text style={{ color: '#333', marginTop: 10, fontSize: 20 }}>Your location</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <IonIcon name="location-outline" size={30} style={{ color: '#8B7ED7' }} />
                                <Text style={{ flex: 1, color: '#333', fontSize: 17, flexWrap: 'wrap' }}>
                                    {address}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleGetLocation}
                                style={[styles.buttonClose, { backgroundColor: '#fff', elevation: 5 }]}
                            >
                                <Text style={[styles.textStyle, { color: '#333' }]}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity style={styles.btn} onPress={() => handleFinish()}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Finish</Text>
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
        padding: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width,
        height: height,
        color: 'green',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonClose: {
        width: '100%',
        height: 46,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF',
        marginTop: 18,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    btn: {
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#503EBF',
        marginTop: 60,
    },
});

export default SettingAddress;
