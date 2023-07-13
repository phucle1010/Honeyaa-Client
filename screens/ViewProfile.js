import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import API_URL from '../services/apiRoute';
import InteractNotice from '../components/InteractNotice';

const MyBasicItem = (props) => {
    const { icon, value, basic } = props;
    return (
        <View style={{ ...styles.myBasicItemContainer, paddingVertical: basic ? 4 : 8 }}>
            {basic && (
                <View style={styles.myBasicRow}>
                    <Icon name={icon} size={24} style={styles.iconBasic} />
                </View>
            )}
            <View style={styles.myBasicRow}>
                <Text style={styles.text}>{value}</Text>
            </View>
        </View>
    );
};

const LIKE = 1;
const DISLIKE = 2;
const SUPER_LIKE = 3;

const ViewProfile = ({ navigation, route }) => {
    const user = useSelector((state) => state.user);
    const [interactMessageConfig, setInteractMessageConfig] = useState({
        message: '',
        color: '',
    });
    const userProfile = route.params?.userProfile;
    const basics = userProfile.basics[0];
    const hobbies = userProfile.hobbies;

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

    const handlePostInteract = (type) => {
        setTimeout(() => {
            axios
                .post(`${API_URL}/api/match/interact`, {
                    person_id: user.id,
                    target_id: userProfile.id,
                    interact_type: type,
                })
                .then(async (res) => {
                    if (res.data.statusCode === 200) {
                        if (res.data.is_matched) {
                            // navigate tới màn hình matched
                            await navigation.navigate('Matched', {
                                person_img: user.img[0].image,
                                target_img: userProfile.img[0].image,
                            });
                        } else {
                            showInteractMessage(type, res.data.responseData); /// Hiển thị thanh trượt xuống thông báo tương tác vừa thực hiện
                            setTimeout(() => navigation.navigate('Home'), 300);
                        }
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
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                <View style={styles.imageContainer}>
                    <Swiper showsButtons={false} dotStyle={{ display: 'none' }} activeDotStyle={{ display: 'none' }}>
                        {userProfile?.img.length > 0 &&
                            userProfile?.img.map((profileImage, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: profileImage.image }}
                                    style={[
                                        styles.image,
                                        {
                                            height: '100%',
                                            width: 450,
                                        },
                                    ]}
                                    resizeMode="cover"
                                />
                            ))}
                    </Swiper>
                    <Pressable
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: '2%',
                            width: 30,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#EF8484',
                            borderRadius: 20,
                        }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon name="arrow-down" size={20} color="#ffff" />
                    </Pressable>
                </View>
                <View style={{ ...styles.containerName, marginBottom: 10 }}>
                    <Text style={{ ...styles.name, marginBottom: 0 }}>{userProfile.name}</Text>
                    <Text style={{ ...styles.age, marginLeft: 10 }}>{currentYearsOld(userProfile.dob)}</Text>
                </View>
                <View style={styles.containerAbout_me}>
                    <Text style={styles.name}>About me</Text>
                    <Text style={{ color: '#575757', fontSize: 14 }}>{userProfile.about_me}</Text>
                </View>
                <View style={styles.containerBasic}>
                    <Text style={styles.name}>My basics</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <MyBasicItem basic={true} icon={'moon-outline'} value={basics.zodiac} />
                        <MyBasicItem basic={true} icon={'school-outline'} value={basics.education} />
                        <MyBasicItem basic={true} icon={'language-outline'} value={basics.language} />
                        <MyBasicItem basic={true} icon={'logo-facebook'} value={basics.social_network} />
                        <MyBasicItem basic={true} icon={'barbell-outline'} value={basics.physical} />
                        <MyBasicItem basic={true} icon={'paw-outline'} value={basics.pet} />
                        <MyBasicItem basic={true} icon={'musical-note-outline'} value={basics.music} />
                    </View>
                </View>
                <View style={styles.containerInterest}>
                    <Text style={styles.name}>My interests</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {hobbies.map((hobby) => (
                            <MyBasicItem basic={false} icon="" key={hobby.id} value={hobby.name} />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.profileOptions}>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#fa5f55', width: 53, height: 53 }}
                    onPress={() => handlePostInteract(DISLIKE)}
                >
                    <Icon name="close" size={30} color="#fa5f55" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#40b5ad', width: 48, height: 48 }}
                    onPress={() => handlePostInteract(LIKE)}
                >
                    <Icon name="heart-outline" size={30} color="#40b5ad" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.profileOptionItem, borderColor: '#00bfff', width: 53, height: 53 }}
                    onPress={() => handlePostInteract(SUPER_LIKE)}
                >
                    <SimpleIcon name="star" size={26} color="#00bfff" />
                </TouchableOpacity>
            </View>
            {interactMessageConfig.message && (
                <InteractNotice
                    interactMessageConfig={interactMessageConfig}
                    setInteractMessageConfig={setInteractMessageConfig}
                    mainScreen="ViewProfile"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    imageContainer: {
        height: 550,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageSelectorContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    thumbnailContainer: {
        padding: 2,
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    thumbnailSelected: {
        borderColor: 'purple',
    },
    infoContainer: {
        padding: 20,
    },
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: 10,
        color: '#000000',
    },
    age: {
        fontWeight: '400',
        fontSize: 18,
        color: '#000000',
    },
    containerAbout_me: {
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
    },
    containerBasic: {
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
    },
    myBasicItemContainer: {
        marginRight: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#575757',
    },
    myBasicRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBasic: {
        color: '#666666',
    },
    text: {
        fontSize: 14,
        color: '#575757',
        marginHorizontal: 5,
    },
    containerInterest: {
        paddingVertical: 30,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 0.5,
        paddingBottom: 200,
        paddingHorizontal: 20,
    },
    profileOptions: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    profileOptionItem: {
        marginHorizontal: 10,
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 3,
    },
});

export default ViewProfile;
