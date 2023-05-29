import React from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';

const API_URL = 'http://192.168.1.186:8080';

const myAccount = {
    id: 1,
    name: 'Thần Báo',
    age: 20,
    status: 'Hoạt động gần đây',
    distance: 1,
    gender: 'Nữ',
    img: [
        {
            id: 1,
            url: 'https://cdn.wallpapersafari.com/30/24/Vwmyh9.jpg',
        },
    ],
};

const Account = ({ navigation }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const currentYearsOld = (date) => {
        const currentDate = new Date();
        const dob = new Date(Date.parse(date));
        const yearsOld = Number.parseInt(currentDate.getUTCFullYear()) - Number.parseInt(dob.getUTCFullYear());
        const currentMonth = currentDate.getMonth();
        const monthInDOB = dob.getMonth();
        if (currentMonth < monthInDOB) {
            return yearsOld - 1;
        }
        return yearsOld;
    };

    const handleLogout = async () => {
        const token = '';
        await axios
            .post(`${API_URL}/api/user/signout`, {
                token,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    AsyncStorage.setItem('user_token', JSON.stringify(null)).then(() => {
                        dispatch(setUser({}));
                        Alert.alert('Success', res.data.responseData);
                        navigation.navigate('Login');
                    });
                } else {
                    Alert.alert('Error', res.data.responseData);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
            </View>
            <Text style={styles.txt}>My Account </Text>
            {/* <View>
        <AwesomeExtraIcon name="check-circle" size={20} color="#0d98ba" />
      </View> */}
            {Object.keys(user).length > 0 && (
                <React.Fragment>
                    <View style={styles.wrapImg}>
                        <Image
                            source={{
                                uri: myAccount.img[0].url,
                            }}
                            style={styles.img}
                        />
                    </View>
                    <View style={styles.detailInfo}>
                        <Text style={styles.txtName}>
                            {user.full_name.length > 14 ? user.full_name.substring(0, 11) + ' ...' : user.full_name}
                        </Text>
                        <Text style={styles.txtAge}> {currentYearsOld(user.dob)}</Text>
                        <View style={styles.icon}>
                            <AwesomeExtraIcon name="check-circle" size={20} color="#2F88FF" />
                        </View>
                        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Profile')}>
                            <AwesomeExtraIcon name="pencil" size={20} color="#3DA686" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <View style={styles.btnSettings}>
                            <Text style={styles.txtSettings}>Settings</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnLogOut} onPress={handleLogout}>
                        <Text style={styles.txtLogOut}>Log Out</Text>
                    </TouchableOpacity>
                </React.Fragment>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        marginTop: -35,
        height: 201,
        width: 156,
    },
    txt: {
        //height: '50%',
        width: '100%',
        fontFamily: 'Poppins',
        fontWeight: 400,
        color: '#666666',
        fontSize: 18,
        marginLeft: 30,
    },
    wrapImg: {
        width: 170,
        height: 170,
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#EF9797',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    detailInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    txtName: {
        fontFamily: 'Overpass',
        fontWeight: 400,
        fontSize: 28,
        color: '#575757',
    },
    txtAge: {
        fontFamily: 'Overpass',
        fontWeight: 400,
        fontSize: 24,
        alignSelf: 'flex-end',
        color: '#575757',
        marginLeft: 5,
        marginRight: 5,
        // paddingTop: 6,
    },
    icon: {
        // backgroundColor: 'red',
        marginLeft: 10,
        alignItems: 'center',
        // alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    btnSettings: {
        marginTop: 30,
        height: 45,
        width: 346,
        marginHorizontal: 22,
        borderRadius: 25,
        backgroundColor: '#EF9797',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSettings: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        alignSelf: 'center',
        color: '#FFFFFF',
    },
    btnLogOut: {
        marginTop: 30,
        height: 45,
        width: 346,
        marginHorizontal: 22,
        borderRadius: 25,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtLogOut: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        alignSelf: 'center',
        color: '#848484',
    },
});

export default Account;
