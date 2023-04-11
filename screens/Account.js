import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Account = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Account</Text>
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

export default Account;
