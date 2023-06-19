import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SentItem from '../components/SendItem';
import API_URL from '../services/apiRoute';

export default function Sent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/user/toplike`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <SentItem name={item.full_name} uri={item.image.split(',')[0]} />}
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
