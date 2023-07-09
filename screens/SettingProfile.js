import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, Switch, Alert, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
import API_URL from '../services/apiRoute';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ChangePassword = ({ phone, showChangePass }) => {
    const initPasses = {
        current: '',
        new_pass: '',
        re_new: '',
    };
    const [showedPass, setShowedPass] = useState(false);
    const [showedRePass, setShowedRePass] = useState(false);
    const [showedNewPass, setShowedNewPass] = useState(false);
    const [passes, setPasses] = useState({
        ...initPasses,
    });

    const handleSavePassword = () => {
        axios
            .put(`${API_URL}/api/user/profile/password`, {
                ...passes,
                phone,
            })
            .then((res) => {
                Alert.alert('Notify', res.data.responseData);
                if (res.data.statusCode === 200) {
                    setPasses(initPasses);
                    showChangePass(false);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    return (
        <View>
            <View style={styles.passcontainer}>
                <TextInput
                    style={styles.password}
                    placeholder="Current Password"
                    secureTextEntry={!showedPass}
                    defaultValue={passes.current}
                    onChangeText={(pass) =>
                        setPasses((prev) => {
                            return {
                                ...prev,
                                current: pass,
                            };
                        })
                    }
                    placeholderTextColor={'#767676'}
                />
                <TouchableOpacity onPress={() => setShowedPass((prev) => !prev)}>
                    <Icon
                        name={showedPass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        style={{ color: '#767676', marginHorizontal: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.passcontainer}>
                <TextInput
                    style={styles.password}
                    placeholder="New Password"
                    secureTextEntry={!showedNewPass}
                    defaultValue={passes.new_pass}
                    onChangeText={(pass) =>
                        setPasses((prev) => {
                            return {
                                ...prev,
                                new_pass: pass,
                            };
                        })
                    }
                    placeholderTextColor={'#767676'}
                />
                <TouchableOpacity onPress={() => setShowedNewPass((prev) => !prev)}>
                    <Icon
                        name={showedNewPass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        style={{ color: '#767676', marginHorizontal: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.passcontainer}>
                <TextInput
                    style={styles.password}
                    placeholder="Re-Password"
                    secureTextEntry={!showedRePass}
                    defaultValue={passes.pass}
                    onChangeText={(pass) =>
                        setPasses((prev) => {
                            return {
                                ...prev,
                                re_new: pass,
                            };
                        })
                    }
                    placeholderTextColor={'#767676'}
                />
                <TouchableOpacity onPress={() => setShowedRePass((prev) => !prev)}>
                    <Icon
                        name={showedRePass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        style={{ color: '#767676', marginHorizontal: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{ ...styles.btn, borderRadius: 10, marginHorizontal: 20 }}
                onPress={handleSavePassword}
            >
                <Text style={styles.txtbtn}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const SettingProfile = ({ navigation, route }) => {
    const currentUser = useSelector((state) => state.user);
    const [state, setState] = useState({
        age_oriented: currentUser?.age_oriented || 0,
        distance: currentUser?.distance || 0,
        active_status: Boolean(currentUser?.active_status.data[0]),
    });
    const [showedChangePassword, setShowedChangePassword] = useState(false);

    useEffect(() => {
        updateDatabase();
    }, [state.age, state.distance, state.active_status]);

    const snapPoints = useMemo(() => ['50%'], []);

    const handleAgeChange = (newAge) => {
        setState((prevState) => ({ ...prevState, age_oriented: newAge }));
    };

    const handleDistanceChange = (newDistance) => {
        setState((prevState) => ({ ...prevState, distance: newDistance }));
    };

    const handleActiveStatusChange = (newActiveStatus) => {
        setState((prevState) => ({ ...prevState, active_status: newActiveStatus }));
    };

    const updateDatabase = () => {
        setTimeout(() => {
            axios
                .put(`${API_URL}/api/user/setprofile/${currentUser.id}`, {
                    age_oriented: state.age_oriented,
                    distance: state.distance,
                    active_status: Boolean(state.active_status),
                })
                .then((response) => {})
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back-circle-outline" size={30} style={styles.icon} />
                    </TouchableOpacity>
                    <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
                </View>

                <Text style={styles.txtHeader}>Setting Profile</Text>
            </View>
            <View style={styles.wrapItem}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={styles.txtWrap}>Age:</Text>
                    <Text style={styles.txtWrap}> {state.age_oriented}</Text>
                </View>

                <Slider
                    maximumValue={100}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={1}
                    value={state.age_oriented}
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
                    <Text style={[styles.txtWrap, { marginTop: 20, marginLeft: 60 }]}>OFF</Text>
                    <Switch
                        style={{ marginTop: 30, marginLeft: 20 }}
                        value={state.active_status}
                        // thumbColor={'#503EBF'}
                        // trackColor={state.active_status ? '#fafafa' : '#efefef'}
                        onValueChange={handleActiveStatusChange}
                    />
                    <Text style={[styles.txtWrap, { marginTop: 20 }]}>ON</Text>
                </View>
            </View>
            <View style={[styles.wrapItem, { height: 106 }]}>
                <Text style={[styles.txtWrap, { marginTop: 10 }]}>Password</Text>
                <TouchableOpacity style={styles.btn} onPress={() => setShowedChangePassword(true)}>
                    <Text style={styles.txtbtn}>Change</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width: 346, backgroundColor: '#EF9797', paddingVertical: 10, borderRadius: 30 }}>
                <Text style={styles.txtbtn}>Lock Account</Text>
            </TouchableOpacity>
            {showedChangePassword && (
                <BottomSheet
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    onClose={() => setShowedChangePassword(false)}
                >
                    <View style={styles.contentContainer}>
                        <ChangePassword phone={currentUser.phone} showChangePass={setShowedChangePassword} />
                    </View>
                </BottomSheet>
            )}
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#ffff',
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
        marginBottom: 25,
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
        marginHorizontal: 10,
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
        color: '#8B7ED7',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10,
    },
    passcontainer: {
        flexDirection: 'row',
        // width: 346,
        height: 46,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#767676',
        // borderColor: '#ffffff',
        alignItems: 'center',
    },
    password: {
        flex: 1,
        paddingHorizontal: 10,
        color: '#767676',
    },
});

export default SettingProfile;
