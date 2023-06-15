import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Loading from '../components/Loading';

const PROFILES = {
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
            id: 2,
            name: 'Nghe nhạc',
        },
        {
            id: 3,
            name: 'Ăn uống',
        },
        {
            id: 4,
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

const ReviewProfile = () => {
    const currentUser = useSelector((state) => state.user);
    const isFocusedScreen = useIsFocused();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const API_URL = 'http://192.168.1.186:8080';

    const getImageListOfUser = async () => {
        await axios
            .get(`${API_URL}/api/user/profile/img/reviews`, {
                params: {
                    person_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    Alert.alert('Error', err.toString());
                } else {
                    setPhotos(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    useEffect(() => {
        if (isFocusedScreen) {
            getImageListOfUser();
        } else {
            setPhotos([]);
        }
    }, []);

    return (
        <View style={styles.container}>
            {loaded ? (
                <View style={styles.imageContainer}>
                    <ScrollView horizontal pagingEnabled>
                        {photos.map((image) => (
                            <TouchableOpacity
                                key={image.id}
                                onPress={() => setSelectedImageIndex(image.id - 1)}
                                activeOpacity={0.8}
                                style={{
                                    height: '80%',
                                    width: 450,
                                }}
                            >
                                <Image
                                    source={{ uri: image.image }}
                                    style={[
                                        styles.image,
                                        selectedImageIndex === image.id - 1 &&
                                            {
                                                // borderWidth: 2,
                                                // borderColor: 'purple',
                                            },
                                    ]}
                                />
                                <View style={styles.profileDesc}>
                                    <Text style={styles.nameUser}>{currentUser.full_name}</Text>
                                    <Text style={styles.age}>{PROFILES.age}</Text>
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            padding: 4,
                                            borderRadius: 50,
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <AwesomeExtraIcon name="check" size={18} color="#0096FF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <Loading />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 22,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
    },
    containerHead: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    goback: {
        position: 'absolute',
        top: 13,
        left: 22,
        width: 24,
        height: 24,
    },
    logo: {
        width: 156,
        height: 201,
        top: -40,
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    tabBtn: {
        height: 60,
        width: '49.8%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C8C8C8',
        marginBottom: 10,
        justifyContent: 'center',
    },
    tabName: {
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 21,
        color: '#666666',
        textAlign: 'center',
    },
    imageContainer: {
        height: 585,
        borderRadius: 15,
        overflow: 'hidden',
    },
    image: {
        marginTop: 15,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    profileDesc: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
        // backgroundColor: 'red',
        zIndex: 1,
    },
    nameUser: {
        fontWeight: 400,
        fontSize: 30,
        fontStyle: 'normal',
        color: '#FFFFFF',
        padding: 5,
    },
    age: {
        fontWeight: 400,
        fontSize: 24,
        fontStyle: 'normal',
        color: '#FFFFFF',
        padding: 5,
    },
});

export default ReviewProfile;
