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
            url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/299c36a8-6b55-41b8-89ba-a2a33c7a18a6/df06ey6-c0a0faa5-cd5c-488e-a29a-72b3768979af.jpg/v1/fill/w_623,h_1282,q_70,strp/hd_wallpaper_cute_anime_girl_pink_kawaii_by_callmehlexie_df06ey6-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY0NCIsInBhdGgiOiJcL2ZcLzI5OWMzNmE4LTZiNTUtNDFiOC04OWJhLWEyYTMzYzdhMThhNlwvZGYwNmV5Ni1jMGEwZmFhNS1jZDVjLTQ4OGUtYTI5YS03MmIzNzY4OTc5YWYuanBnIiwid2lkdGgiOiI8PTgwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.XYQFdLwg6tv24B-YgZtCePSEWZW9jCjJimF5tMBDUMQ',
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
                            <TouchableOpacity style={styles.sliderItem} onPress={() => setSelectedImageIndex(0)} />
                            <TouchableOpacity style={styles.sliderItem} onPress={() => setSelectedImageIndex(1)} />
                            <TouchableOpacity style={styles.sliderItem} onPress={() => setSelectedImageIndex(2)} />
                            <TouchableOpacity style={styles.sliderItem} onPress={() => setSelectedImageIndex(3)} />
                            <TouchableOpacity style={styles.sliderItem} onPress={() => setSelectedImageIndex(4)} />
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
                                <Text style={{ ...styles.profileDetailItem, fontWeight: '700', letterSpacing: 1 }}>
                                    {user.full_name}
                                </Text>
                                <Text style={{ ...styles.profileDetailItem, fontSize: 26 }}>{PROFILE.age}</Text>
                                <AwesomeExtraIcon name="check-circle" size={34} color="#0d98ba" />
                            </View>
                            <View style={styles.profileDesc}>
                                <Text style={{ ...styles.profileDetailItem, fontSize: 16, color: '#fff' }}>
                                    {PROFILE.status}
                                </Text>
                                <OctIcon
                                    name="dot-fill"
                                    style={{ ...styles.profileDetailItem, fontSize: 18, color: '#7cfc00' }}
                                />
                            </View>
                            <View style={styles.profileDesc}>
                                <Text
                                    style={{ ...styles.profileDetailItem, fontSize: 16, color: '#fff' }}
                                >{`Cách xa ${PROFILE.distance}km`}</Text>
                                <Icon
                                    name="location-sharp"
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#ff7f50',
                                        marginLeft: 0,
                                    }}
                                />
                            </View>
                            <Icon
                                name="arrow-down-circle-sharp"
                                size={30}
                                color="#fff"
                                style={{ marginLeft: 'auto' }}
                                onPress={() => {}}
                            />
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
                            <TouchableOpacity style={{ ...styles.profileOptionItem, borderColor: '#00bfff' }}>
                                <AwesomeExtraIcon name="star" size={24} color="#00bfff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#40b5ad' }}
                                onPress={() => {}}
                            >
                                <AwesomeExtraIcon name="heart" size={24} color="#40b5ad" />
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
        bottom: '97%',
        zIndex: 100,
        height: 8,
        flexDirection: 'row',
    },
    sliderItem: {
        height: '100%',
        width: '18%',
        marginHorizontal: '1%',
        backgroundColor: 'rgba(255,255,255, .6)',
        borderRadius: 10,
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    profileInfo: {
        position: 'absolute',
        bottom: 75,
        left: 10,
        right: 10,
    },
    profileDesc: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    profileDetailItem: {
        marginRight: 10,
        fontSize: 30,
        color: '#fff',
    },
    profileOptions: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
