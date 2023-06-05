/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Text, View, StyleSheet, Image, Alert, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, removeUserFromApp } from '../reducers/user';
import Loading from '../components/Loading';

const PROFILES = [
    {
        id: 1,
        name: 'Thần Báo',
        age: 20,
        status: 'Hoạt động gần đây',
        distance: 1,
        gender: 'Nữ',
        img: [
            {
                id: 1,
                url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/297be08c-1ddb-4b84-be0c-01f60d984bdc/dflvygw-248d6628-a2bb-4978-84b4-c0a2db3e674b.jpg/v1/fill/w_730,h_1095,q_70,strp/beautiful_anime_kawaii_cute_classmate_girl_by_sianworld_dflvygw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUzNiIsInBhdGgiOiJcL2ZcLzI5N2JlMDhjLTFkZGItNGI4NC1iZTBjLTAxZjYwZDk4NGJkY1wvZGZsdnlndy0yNDhkNjYyOC1hMmJiLTQ5NzgtODRiNC1jMGEyZGIzZTY3NGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hPOU0KOYKq6h5z0uTRwxiGCna0dRTnnmw0M7JJgi1X4',
            },
            {
                id: 2,
                url: 'https://s3.bukalapak.com/img/8106122415/large/IMG_20181230_WA0156_scaled.jpg.webp',
            },
            {
                id: 3,
                url: 'https://w0.peakpx.com/wallpaper/432/513/HD-wallpaper-anime-girl-cool-nice-refrishin.jpg',
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
    },
    {
        id: 1,
        name: 'Thần Báo',
        age: 20,
        status: 'Hoạt động gần đây',
        distance: 1,
        gender: 'Nữ',
        img: [
            {
                id: 1,
                url: 'https://a-static.besthdwallpaper.com/cute-anime-girl-with-her-big-eyes-wallpaper-640x1136-104648_163.jpg',
            },
            {
                id: 2,
                url: 'https://iphoneswallpapers.com/wp-content/uploads/2023/02/Anime-Cute-Girl-iPhone-Wallpaper-HD.jpg',
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
    },
];

const LIKE = 1;
const DISLIKE = 2;
const SUPER_LIKE = 3;

const InteractNotice = ({ ...props }) => {
    const top = useRef(new Animated.Value(80)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(top, {
                duration: 600,
                toValue: 120,
                useNativeDriver: false,
            }),
        ]).start();

        Animated.sequence([
            Animated.timing(opacity, {
                duration: 1000,
                toValue: 0,
                useNativeDriver: false,
            }),
        ]).start();

        setTimeout(() => {
            props.setInteractMessageConfig({
                message: '',
                color: '',
            });
        }, 1200);

        return clearTimeout();
    }, []);

    return (
        <Animated.View
            style={[
                styles.interactNoticeContainer,
                {
                    top,
                    opacity,
                    backgroundColor: props.interactMessageConfig.color,
                },
            ]}
        >
            <Text style={styles.interactNoticeText}>{props.interactMessageConfig.message}</Text>
        </Animated.View>
    );
};

const Home = ({ navigation, route }) => {
    const user = useSelector((state) => state.user);
    const successfulLogin = route.params?.successfulLogin;

    const dispatch = useDispatch();
    const sliderItemWidth = 100; /// userProfile.img.length;
    const [loadedProfiles, setLoadedProfiles] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [interactMessageConfig, setInteractMessageConfig] = useState({
        message: '',
        color: '',
    });
    const [userProfile, setUserProfile] = useState({});
    const API_URL = 'http://192.168.1.186:8080';

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

    const handleGetUser = async () => {
        const userToken = AsyncStorage.getItem('user_token');
        if (userToken === null) {
            AsyncStorage.setItem('user_token', JSON.stringify(''));
        } else {
            await AsyncStorage.getItem('user_token')
                .then((token) => {
                    if (token !== null) {
                        storeUserData(token);
                    } else {
                        navigation.navigate('Login');
                    }
                })
                .catch((err) => Alert.alert('Error', err));
        }
    };

    successfulLogin && handleGetUser();

    useEffect(() => {
        handleGetUser();
    }, []);

    const getUserProfile = async () => {
        const token = JSON.parse(await AsyncStorage.getItem('user_token'));
        const response = await axios.get(`${API_URL}/api/user/potential_love`, { params: { token } });
        return response.data;
    };

    const fetchUserProfile = async () => {
        try {
            const data = await getUserProfile();
            setUserProfile(data);
            setLoadedProfiles(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user?.id && !loadedProfiles) {
            fetchUserProfile();
        }
    }, [user]);

    const handleRedoProfile = () => {
        Alert.alert('Notice', 'You have to upgrade your account to use this functionality');
    };

    const showInteractMessage = (type, response) => {
        switch (type) {
            case LIKE:
                setInteractMessageConfig({
                    message: response,
                    color: '#40b5ad',
                });
                break;
            case DISLIKE:
                setInteractMessageConfig({
                    message: response,
                    color: '#fa5f55',
                });
                break;
            case SUPER_LIKE:
                setInteractMessageConfig({
                    message: response,
                    color: '#00bfff',
                });
                break;
            default:
                break;
        }
    };

    const handlePostInteract = async (type) => {
        setTimeout(() => {
            axios
                .post(`${API_URL}/api/match/interact`, {
                    person_id: user.id,
                    target_id: userProfile.id,
                    interact_type: type,
                })
                .then(async (res) => {
                    if (res.data.statusCode === 200) {
                        showInteractMessage(type, res.data.responseData); /// Hiển thị thanh trượt xuống thông báo tương tác vừa thực hiện
                        await fetchUserProfile();
                    } else {
                        Alert.alert('Fail', res.data.responseData);
                    }
                })
                .catch((err) => Alert.alert('Fail', err.toString()));
        }, 200);
    };

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
                            {(userProfile.img.length > 0 ? userProfile.img : PROFILES[0].img).map((profile, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        ...styles.sliderItem,
                                        backgroundColor:
                                            index !== selectedImageIndex
                                                ? 'rgba(103, 103, 103, 0.3)'
                                                : 'rgba(255, 255, 255, 0.8)',
                                        width: `${sliderItemWidth}%`,
                                    }}
                                    onPress={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </View>
                        {
                            <Image
                                source={{
                                    uri: PROFILES[0].img[selectedImageIndex].url,
                                }}
                                style={styles.profileImage}
                            />
                        }
                        <View style={styles.profileInfo}>
                            <View style={styles.profileDesc}>
                                {/* Họ tên */}
                                <Text
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontWeight: '700',
                                        letterSpacing: 1,
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    {userProfile.name && userProfile.name.length > 14
                                        ? userProfile.name.substring(0, 11) + '...'
                                        : userProfile.name}
                                </Text>
                                {/* Ngày sinh */}
                                <Text style={{ ...styles.profileDetailItem, fontSize: 26 }}>
                                    {currentYearsOld(userProfile.dob)}
                                </Text>
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
                                        marginTop: 10,
                                        marginBottom: 4,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        fontSize: 16,
                                        color: '#fff',
                                        fontWeight: '400',
                                        backgroundColor: '#0BDA51',
                                        borderRadius: 20,
                                    }}
                                >
                                    {userProfile.status}
                                </Text>
                            </View>
                            <View style={styles.profileDesc}>
                                <Text
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#fff',
                                        fontWeight: '500',
                                    }}
                                >{`Cách xa ${userProfile.distance}km`}</Text>
                                <Icon
                                    name="location-sharp"
                                    style={{
                                        ...styles.profileDetailItem,
                                        fontSize: 18,
                                        color: '#ffff',
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
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#ffbf00' }}
                                onPress={handleRedoProfile}
                            >
                                <AwesomeIcon name="redo" size={24} color="#ffbf00" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#fa5f55' }}
                                onPress={() => handlePostInteract(DISLIKE)}
                            >
                                <AwesomeExtraIcon name="close" size={30} color="#fa5f55" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#40b5ad' }}
                                onPress={() => handlePostInteract(LIKE)}
                            >
                                <AwesomeExtraIcon name="heart" size={24} color="#40b5ad" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.profileOptionItem, borderColor: '#00bfff' }}
                                onPress={() => handlePostInteract(SUPER_LIKE)}
                            >
                                <AwesomeExtraIcon name="star" size={24} color="#00bfff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {interactMessageConfig.message && (
                        <InteractNotice
                            interactMessageConfig={interactMessageConfig}
                            setInteractMessageConfig={setInteractMessageConfig}
                        />
                    )}
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
    interactNoticeContainer: {
        position: 'absolute',
        left: '35%',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    interactNoticeText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Home;
