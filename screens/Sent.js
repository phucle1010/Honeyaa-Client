import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SentItem from '../components/SentItem';
import { useSelector } from 'react-redux';
export default function Sent() {
    const [data, setData] = useState([]);
    const API_URL = 'http://192.168.0.102:8080/api/user';
    const currentUser = useSelector((state) => state.user);
    useEffect(() => {
        axios
            .get(`${API_URL}/sent/${currentUser.id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    }, []);
    const handleDeleteSent = (likeId)=>{
        axios
            .delete(`${API_URL}/sent/delete/${likeId}`)
            .then((response) => {
                const newData = data.filter(item => item.likeId !== likeId);
                setData(newData);
                console.log('delete successfully')
            })
            .catch((error) => {
                console.log('lỗi:', error);
            });
    }
console.log(data)
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => 
                <SentItem 
                onPress={()=>handleDeleteSent(item.likeId)}
                name={item.full_name} 
                uri={item.image} />}
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
