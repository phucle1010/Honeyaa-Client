import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import API_URL from '../services/apiRoute';
//import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';

const SettingProfile = ({ navigation, route }) => {
    const currentUser = useSelector((state) => state.user);
    const [state, setState] = useState({
        age: currentUser.age,
        distance: currentUser.distance,
        active_status: currentUser.active_status,
    });

    useEffect(() => {
        console.log(state.age);
        console.log(state.distance);
        console.log(state.active_status);
        updateDatabase();
    }, [state.age, state.distance, state.active_status]);
    const handleAgeChange = (newAge) => {
        setState((prevState) => ({ ...prevState, age: newAge }));
    };

    const handleDistanceChange = (newDistance) => {
        setState((prevState) => ({ ...prevState, distance: newDistance }));
    };

    const handleActiveStatusChange = (newActiveStatus) => {
        setState((prevState) => ({ ...prevState, active_status: newActiveStatus }));
    };

    const updateDatabase = () => {
        axios
            .put(`${API_URL}/api/user/setprofile/${currentUser.id}`, {
                age: state.age,
                distance: state.distance,
                active_status: state.active_status,
            })
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPressIn={() => navigation.navigate('Account')}>
                        <Image source={require('../assets/img/arrowcircleleft2.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
                </View>

                <Text style={styles.txtHeader}>Setting Profile</Text>
            </View>
            <View style={styles.wrapItem}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={styles.txtWrap}>Age:</Text>
                    <Text style={styles.txtWrap}> {state.age}</Text>
                </View>

                <Slider
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={1}
                    value={state.age}
                    onValueChange={handleAgeChange}
                />
            </View>
            <View style={styles.wrapItem}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={styles.txtWrap}>Distance:</Text>
                    <Text style={styles.txtWrap}>{state.distance}</Text>
                    <Text style={styles.txtWrap}>km</Text>
                </View>

                <Slider
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={1}
                    value={state.distance}
                    onValueChange={handleDistanceChange}
                />
            </View>
            <View style={styles.wrapItem}>
                <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
                    <Text style={[styles.txtWrap, { marginTop: 20 }]}>Active Status</Text>
                    <Text style={[styles.txtWrap, { marginTop: 20, marginLeft: 60 }]}>ON</Text>
                    <Switch
                        style={{ marginTop: 30, marginLeft: 20 }}
                        value={state.active_status}
                        onValueChange={handleActiveStatusChange}
                    />
                    <Text style={[styles.txtWrap, { marginTop: 20 }]}>OFF</Text>
                </View>
            </View>
            <View style={[styles.wrapItem, { height: 106 }]}>
                <Text style={[styles.txtWrap, { marginTop: 10 }]}>Password</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RestoreAccount')}>
                    <Text style={styles.txtbtn}>Change</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#EF9797' }]}>
                <Text style={styles.txtbtn}>Lock Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        marginTop: -35,
        height: 200,
        width: 156,
    },

    txtHeader: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#575757',
        fontSize: 20,
        position: 'absolute',
        paddingTop: 120,
        alignSelf: 'center',
    },
    wrapItem: {
        marginTop: 4,
        marginHorizontal: 10,
        width: 346,
        height: 85,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 2,
        marginBottom: 32,
    },
    txtWrap: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        color: '#626262',
        paddingLeft: 15,
        paddingTop: 9,
    },
    btn: {
        marginTop: 10,
        height: 40,
        width: 330,
        marginHorizontal: 5,
        borderRadius: 25,
        backgroundColor: '#503EBF',
        alignContent: 'center',
        justifyContent: 'center',
    },
    txtbtn: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 400,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    icon: {
        marginLeft: -80,
        marginTop: 20,
        width: 24,
        height: 24,
    },
});

export default SettingProfile;
