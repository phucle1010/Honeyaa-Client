import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';

const Matched = ({ navigation, route }) => {
    const { person_img, target_img } = route.params;
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scale, {
                duration: 2000,
                toValue: 1,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} Ư />
            <View style={styles.matchedInfo}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Text style={styles.heading}>Matched Successfully</Text>
                </Animated.View>
                <View style={styles.couple}>
                    <Image source={{ uri: person_img }} style={{ ...styles.womanObject, ...styles.manObject }} />
                    <Image source={{ uri: target_img }} style={styles.womanObject} />
                </View>

                <View style={styles.sendMsg}>
                    <TextInput style={styles.msgContent} placeholder="Send message now..." />
                    <TouchableOpacity onPress={() => navigation.navigate('MatchChat')}>
                        <Image
                            source={require('../assets/img/send.png')}
                            style={{
                                marginLeft: 25,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        marginTop: -150,
        // marginLeft: (Dimensions.get('window').width - 300) / 2,
        width: 300,
        height: 150,
    },
    matchedInfo: {},
    heading: {
        marginBottom: 50,
        width: 275,
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 34,
        color: '#FF6868',
        alignSelf: 'center',
        textAlign: 'center',
    },
    couple: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    manObject: {
        marginRight: -40,
    },
    womanObject: {
        width: 190,
        height: 190,
        borderRadius: 100,
    },
    sendMsg: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgContent: {
        width: 270,
        paddingVertical: 12,
        paddingHorizontal: 18,
        fontStyle: 'italic',
        fontSize: 16,
        borderRadius: 50,
        backgroundColor: '#fafafa',
        elevation: 10,
        shadowColor: '#7c7c7c',
    },
});

export default Matched;
