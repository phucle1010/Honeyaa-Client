/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, removeUserFromApp } from '../reducers/user';
import Loading from '../components/Loading';

const NUMBER_IMAGES_OF_EACH_PROFILE = 5;

const PROFILE = {
    id: 1,
    name: 'Thần Báo',
    age: 20,
    status: 'Hoạt động gần đây',
    distance: 1,
    gender: 'Nữ',
    img: [
        {
            id: 1,
            url: 'https://cdn.tgdd.vn//GameApp/1350037//50-800x1422.jpg',
        },
        {
            id: 2,
            url: 'https://w0.peakpx.com/wallpaper/330/348/HD-wallpaper-blue-eye-cute-alone-anime-girl.jpg',
        },
        {
            id: 3,
            url: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-anime-vui-ve-nu-cong-so-dang-yeu.jpg',
        },
        {
            id: 4,
            url: 'https://w0.peakpx.com/wallpaper/368/441/HD-wallpaper-cute-anime-girl-anime-cat-girl-anime-girl-cartoon-cat-girl-cute-anime.jpg',
        },
        {
            id: 5,
            url: 'https://phunugioi.com/wp-content/uploads/2020/03/hinh-anh-anime-girl-de-thuong.jpg',
        },
    ],
    hobbies: [
        {
            id: 1,
            name: 'Du lịch',
        },
        {
            id: 1,
            name: 'Nghe nhạc',
        },
        {
            id: 1,
            name: 'Ăn uống',
        },
        {
            id: 1,
            name: 'Đọc sách',
        },
    ],
    introduction: 'Ly cà phê của em hơi đắng. Có vẻ thiếu vị ngọt từ anh!!!',
    socialContact: {
        facebook: 'annoy1010',
        instagram: 'Annoy',
    },
    approachObject: 'Cần tìm người yêu',
};

const API_URL = 'http://192.168.1.186:8080';

const Home = ({ navigation, route }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const storeUserData = async (token) => {
        await axios
            .get(`${API_URL}/api/user/data`, { params: { token } })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    dispatch(setUser(res.data.responseData[0]));
                    setLoaded(true);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    const handleGetUser = () => {
        const userToken = AsyncStorage.getItem('user_token');
        if (userToken === null) {
            AsyncStorage.setItem('user_token', JSON.stringify(''));
        } else {
            AsyncStorage.getItem('user_token')
                .then((token) => {
                    if (token !== 'null') {
                        storeUserData(token);
                    } else {
                        navigation.navigate('Login');
                    }
                })
                .catch((err) => Alert.alert('Error', err));
        }
    };

    useEffect(() => {
        handleGetUser();
    }, []);

    return (
        <SafeAreaView>
            {loaded ? (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
                        <View style={styles.options}>
                            <Icon name="ios-notifications-outline" size={20} style={styles.optionIcon} />
                            <AwesomeIcon name="sliders-h" size={20} style={styles.optionIcon} />
                        </View>
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.slider}>
                            {PROFILE.img.map((profile, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        ...styles.sliderItem,
                                        backgroundColor:
                                            index !== selectedImageIndex
                                                ? 'rgba(103, 103, 103, 0.3)'
                                                : 'rgba(255, 255, 255, 0.8)',
                                    }}
                                    onPress={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </View>
                        {
                            <Image
                                source={{
                                    uri: PROFILE.img[selectedImageIndex].url,
                                }}
                                style={styles.profileImage}
                            />
                        }
                        <View style={styles.profileInfo}>
                            <View style={styles.profileDesc}>
                                <Text
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontWeight: '700',
                                        letterSpacing: 1,
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    {user.full_name.length > 14
                                        ? user.full_name.substring(0, 11) + '...'
                                        : user.full_name}
                                </Text>
                                <Text style={{ ...styles.profileDetailItem, fontSize: 26 }}>{PROFILE.age}</Text>
                                <View
                                    style={{
                                        width: 26,
                                        height: 26,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        borderRadius: 50,
                                        elevation: 4,
                                    }}
                                >
                                    <AwesomeExtraIcon name="check" size={18} color="#0096FF" />
                                </View>
                            </View>
                            <View style={styles.profileDesc}>
                                <Text
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#fff',
                                        fontWeight: '500',
                                    }}
                                >
                                    {PROFILE.status}
                                </Text>
                                <OctIcon
                                    name="dot-fill"
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#7cfc00',
                                    }}
                                />
                            </View>
                            <View style={styles.profileDesc}>
                                <Text
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#fff',
                                        fontWeight: '500',
                                    }}
                                >{`Cách xa ${PROFILE.distance}km`}</Text>
                                <Icon
                                    name="location-sharp"
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#FF3131',
                                        marginLeft: 0,
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 'auto',
                                    width: 25,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderRadius: 50,
                                    elevation: 4,
                                }}
                            >
                                <Icon name="arrow-down" size={15} color="#767676" onPress={() => {}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileOptions}>
                            <TouchableOpacity style={{ ...styles.profileOptionItem, borderColor: '#ffbf00' }}>
                                <AwesomeIcon name="redo" size={24} color="#ffbf00" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#fa5f55' }}
                                onPress={() => {}}
                            >
                                <AwesomeExtraIcon name="close" size={30} color="#fa5f55" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#40b5ad' }}
                                onPress={() => {}}
                            >
                                <AwesomeExtraIcon name="heart" size={24} color="#40b5ad" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.profileOptionItem, borderColor: '#00bfff' }}>
                                <AwesomeExtraIcon name="star" size={24} color="#00bfff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <Loading />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        marginLeft: -48,
        height: 50,
        width: 160,
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    optionIcon: {
        marginLeft: 15,
    },
    profile: {
        marginHorizontal: 20,
        marginTop: 10,
        height: '75%',
        borderRadius: 10,
    },
    slider: {
        position: 'absolute',
        bottom: '98%',
        zIndex: 100,
        height: 6,
        left: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(103, 103, 103, 0.3)',
        borderRadius: 13,
    },
    sliderItem: {
        height: '100%',
        width: '20%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    profileInfo: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        paddingLeft: 30,
        paddingTop: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    profileDesc: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    profileDetailItem: {
        marginRight: 10,
        fontSize: 28,
        color: '#fff',
    },
    profileOptions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    profileOptionItem: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});

export default Home;
