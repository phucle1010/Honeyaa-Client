import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Favorites = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Favorites</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Favorites;
