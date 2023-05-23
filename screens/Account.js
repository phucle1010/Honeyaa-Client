import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.186:8080';

const Account = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        const token = '';
        await axios
            .post(`${API_URL}/api/user/signout`, {
                token,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    AsyncStorage.setItem('user_token', JSON.stringify(null)).then(() => {
                        dispatch(setUser({}));
                        Alert.alert('Success', res.data.responseData);
                        navigation.navigate('Login');
                    });
                } else {
                    Alert.alert('Error', res.data.responseData);
                }
            })
            .catch((err) => Alert.alert('Error', err.toString()));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Account</Text>
            <Button onPress={() => navigation.navigate('Profile')} title="Chỉnh sửa" />
            <Button style={{ marginTop: 20 }} onPress={handleSignOut} title="Đăng xuất" />
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
