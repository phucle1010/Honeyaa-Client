import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeExtraIcon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import API_URL from '../services/apiRoute';
import Swiper from 'react-native-swiper';
import Loading from '../components/Loading';

const ReviewProfile = () => {
    const currentUser = useSelector((state) => state.user);
    const isFocusedScreen = useIsFocused();
    const [photos, setPhotos] = useState([]);
    const [loaded, setLoaded] = useState(false);

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
    }, [isFocusedScreen]);

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
        <View style={styles.container}>
            {loaded ? (
                <View style={styles.imageContainer}>
                    <Swiper showsButtons={false} dotStyle={{ display: 'none' }} activeDotStyle={{ display: 'none' }}>
                        {photos.map((image) => (
                            <TouchableOpacity
                                key={image.id}
                                activeOpacity={0.8}
                                style={{
                                    marginTop: 10,
                                    height: '90%',
                                    width: 450,
                                    overflow: 'hidden',
                                    borderRadius: 10,
                                }}
                            >
                                <Image source={{ uri: image.image }} style={[styles.image]} />
                                <View style={styles.profileDesc}>
                                    <Text style={styles.nameUser}>{currentUser.full_name}</Text>
                                    <Text style={styles.age}>{currentYearsOld(currentUser.dob)}</Text>
                                    <View
                                        style={{
                                            // marginBottom: 5,
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
                    </Swiper>
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
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileDesc: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'rgba(103, 103, 103, 0.6)',
        zIndex: 1,
    },
    nameUser: {
        fontWeight: 400,
        fontSize: 20,
        // fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    age: {
        marginHorizontal: 10,
        fontWeight: 400,
        fontSize: 20,
        // fontStyle: 'normal',
        fontWeight: 300,
        color: '#FFFFFF',
    },
});

export default ReviewProfile;
