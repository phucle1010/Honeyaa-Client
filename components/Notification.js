import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_URL from '../services/apiRoute';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const screenWidth = Dimensions.get('window').width;

const NotifyItem = ({ notify, navigation }) => {
    const formattedDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getUTCFullYear()}`;
    };

    const handleViewDetail = () => {
        navigation.navigate('MatchChat');
    };

    return (
        <View style={styles.notifyItemContainer}>
            <View style={styles.imgContainer}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{
                        uri: notify.image,
                    }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.notifyInfo}>
                <Text style={styles.content}>Bạn đã tương hợp với {notify.full_name}</Text>
                <Text style={{ color: '#cdcdcd', marginTop: 2, fontSize: 15 }}>{formattedDate(notify.create_at)}</Text>
                <TouchableOpacity style={styles.viewBtn} onPress={handleViewDetail}>
                    <Text style={styles.viewText}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Notification = ({ show, navigation }) => {
    const currentUser = useSelector((state) => state.user);
    const width = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [notifications, setNotifications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(width, {
                duration: 200,
                toValue: screenWidth,
                useNativeDriver: false,
            }),
        ]).start();
        Animated.sequence([
            Animated.timing(opacity, {
                duration: 150,
                toValue: 1,
                useNativeDriver: false,
            }),
        ]).start();
        getNotifications();
    }, []);

    const getNotifications = async () => {
        await axios
            .get(`${API_URL}/api/user/notifications`, {
                params: {
                    person_id: currentUser.id,
                },
            })
            .then((res) => res.data.statusCode === 200 && setNotifications(res.data.responseData))
            .then(() => setLoaded(true))
            .catch((err) => console.log(err));
    };

    const handleHideNotification = () => {
        show(false);
    };

    return (
        <Animated.View style={[styles.container, { width, opacity }]}>
            {loaded && (
                <React.Fragment>
                    <Pressable style={styles.closeBtn} onPress={handleHideNotification}>
                        <Icon name="close" size={25} color="#FF6868" />
                    </Pressable>
                    <View style={styles.notifyContainer}>
                        <Text style={styles.headerText}>Notification</Text>
                        <ScrollView>
                            {notifications.length > 0 ? (
                                notifications.map((notify, index) => (
                                    <NotifyItem key={index} notify={notify} navigation={navigation} />
                                ))
                            ) : (
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text
                                        style={{
                                            marginTop: 20,
                                        }}
                                    >
                                        Bạn không có bất kỳ thông báo nào
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </React.Fragment>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1000000,
    },
    closeBtn: {
        marginTop: 15,
        marginLeft: 20,
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FF6868',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifyContainer: {
        flex: 1,
        marginTop: 10,
    },
    headerText: {
        marginRight: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
        fontSize: 20,
        color: '#FF6868',
        fontWeight: 'bold',
    },
    notifyItemContainer: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 20,
        paddingTop: 10,
    },
    imgContainer: {
        marginRight: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
    },
    notifyInfo: {
        marginRight: -10,
        flex: 1,
        height: '100%',
        marginBottom: 20,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
    },
    content: {
        fontSize: 17,
        color: '#565656',
    },
    viewBtn: {
        marginTop: 10,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FF6868',
    },
    viewText: {
        fontSize: 15,
        color: '#FF6868',
    },
});

export default Notification;
