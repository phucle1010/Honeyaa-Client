import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Discover = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }]}>
                {/* <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} /> */}
            </View>
            <Text style={[styles.txt, { marginTop: -20 }]}>Discover quickly with the same tendency</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/friendship.png')}
                                resizeMode="stretch"
                            />
                        </View>

                        <Text style={styles.txtItem}>Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/Lover.png')}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.txtItem}>Lover</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={[styles.txt, { marginTop: 15 }]}>For you</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/Travel.jpg')}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.txtItem}>Travel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/Sport.jpg')}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.txtItem}>Sport</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/Eat.jpg')}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.txtItem}>Eat</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.wrapItem}>
                        <View style={styles.wrapImage}>
                            <Image
                                style={styles.image}
                                source={require('../assets/img/Music.jpg')}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={styles.txtItem}>Music</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: {
        marginTop: -35,
        height: 160,
        width: 160,
        // display: 'flex',
    },
    txt: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        color: '#000000',
        marginLeft: '10%',
        width: '100%',
    },
    wrapItem: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '2%',
        marginTop: 15,
    },
    wrapImage: {
        width: '80%',
        height: '80%',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#B2B2B2',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    txtItem: {
        fontFamily: 'Poppins',
        fontWeight: 300,
        fontSize: 14,
        color: '#000000',
    },
});

export default Discover;
