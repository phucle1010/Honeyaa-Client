import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SentItem from '../components/SendItem';
import API_URL from '../services/apiRoute';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export default function Sent() {
    const isFocusedScreen = useIsFocused();
    const currentUser = useSelector((state) => state.user);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isFocusedScreen) {
            axios
                .get(`${API_URL}/api/user/sent/all/${currentUser.id}`)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log('lỗi:', error);
                });
        }
    }, [isFocusedScreen]);

    const handleDeleteSent = (likeId) => {
        axios
            .delete(`${API_URL}/sent/delete/${likeId}`)
            .then((response) => {
                const newData = data.filter((item) => item.likeId !== likeId);
                setData(newData);
                console.log('delete successfully');
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <SentItem
                        onPress={() => handleDeleteSent(item.likeId)}
                        name={item.full_name}
                        uri={item.image}
                        isResponsed={item.is_responsed.data[0]}
                    />
                )}
                keyExtractor={(item) => item.target_id}
                numColumns={2}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: 11,
        paddingBottom: 90,
    },
});
