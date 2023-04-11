import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Chat = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Chat</Text>
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

export default Chat;
