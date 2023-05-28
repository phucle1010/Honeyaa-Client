/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileDetail = ({ navigation, route }) => {
    // const profile = { ...route.params.profile };

    return (
        <SafeAreaView style={styles.container}>
            <Text>ProfileDetail</Text>
            <Text>{profile.name}</Text>
            <Icon
                name="arrow-up-circle-sharp"
                size={30}
                color="#fff"
                style={{ marginTop: 20 }}
                onPress={() => navigation.navigate('Home')}
            />
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

export default ProfileDetail;
