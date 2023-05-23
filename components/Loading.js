import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/HoneyaaLogo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: '50%',
        height: '50%',
    },
});

export default Loading;
