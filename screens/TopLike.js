import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopLikeItem from '../components/TopLikeItem';

export default function TopLike() {
    const [data, setData] = useState([]);
    const API_URL = 'http://192.168.1.186:8080/api/user';

    useEffect(() => {
        axios
            .get(`${API_URL}/toplike`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    }, []);

    console.log('data length: ', data.length);
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <TopLikeItem name={item.full_name} uri={item.image.split(',')[0]} />}
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